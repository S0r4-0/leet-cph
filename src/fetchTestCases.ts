import path from "path";
import puppeteer from "puppeteer";
import * as vscode from 'vscode';
import fs from 'fs/promises';
import { cleanData } from "./formatData";


export const getTestCases = async (url: string): Promise<void> => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });

    const page = await browser.newPage();

    try{

        // Ensure workspace folder is open
        const dirPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!dirPath){
            throw new Error("Please open a folder in VS Code");
        }
        
        // Navigate to the URL and wait for the required selector to appear
        await page.goto(url, {waitUntil: "domcontentloaded"});
        await page.waitForSelector(".elfjS", {timeout: 5000});
        
        // Fetch the content from the page
        const content = await page.evaluate(() => {
            const element = document.querySelector(".elfjS");
            return (element as HTMLElement) ? (element as HTMLElement).innerText : "Elemet not found";
        });

        // Check if content was fetched successfully
        if (!content || content === "Element not found") {
            throw new Error("Error fetching test cases: Failed to fetch content from the page. Please ensure the URL is correct.");
        }

        console.log("Content of .elfjs: ", content);

        // Extract problem name from the URL
        const problemName = url.split('problems').pop()?.split('/')[1].trim();
        if (!problemName){
            throw new Error("Error fetching test cases: No problem name found in URL.");
        }

        console.log("Problem: ", problemName);
        
        // Extract inputs and outputs using regex
        const inputRegex = /Input:\s*(.*?)(?=Output:|$)/gs;
        const outputRegex = /Output:\s*(.*?)(?=Explanation:|Example|Constraints:|$)/gs;
        
        const inputs: string[] = [];
        const outputs: string[] = [];
        const additionals: string[] = [];

        let inputMatch: RegExpExecArray | null;
        while((inputMatch = inputRegex.exec(content)) !== null){
            inputs.push(cleanData(inputMatch[1].trim(), additionals, true));
        }
        
        let outputMatch: RegExpExecArray | null;
        while((outputMatch = outputRegex.exec(content)) !== null){
            outputs.push(cleanData(outputMatch[1].trim(), additionals, false));
        } 
        
        // Check if inputs and outputs were found
        if (inputs.length === 0 || outputs.length === 0){
            throw new Error("Error fetching test cases: No test cases found.");
        }
        
        
        
        // Define file paths for inputs and outputs
        const finalDirPath = path.join(dirPath, '.leet-cph', problemName);
        console.log("Dir: ", finalDirPath);
        await fs.mkdir(finalDirPath, {recursive: true});
        
        // Checking the Vector/Matrix Size Fix
        console.log(`Size Fix: ${additionals}`);
        
        try{
            // Write inputs and outputs to respective files
            for (let i = 0; i < inputs.length; i++){
                const inputFilePath = path.join(finalDirPath, `input_${i+1}.txt`);
                if (additionals[i]){
                    await fs.writeFile(inputFilePath, `${additionals[i].trim()}\n${inputs[i]}`, 'utf8');
                } else {
                    await fs.writeFile(inputFilePath, inputs[i], 'utf8');
                }
                console.log("Inputs: ", inputs);
            }

            for (let i = 0; i < outputs.length; i++){
                const outputFilePath = path.join(finalDirPath, `output_${i+1}.txt`);
                await fs.writeFile(outputFilePath, outputs[i], "utf-8");
                console.log("Output: ", outputs);
            }
            
        } catch (fileError: any){
            console.error("Error writing files: ", fileError.message);
            throw new Error("Failed to save test cases. Check your folder for permission.", fileError.message);
        }

    } catch(err: any) {
        console.error("Error during scrapping: ", err.message);
        throw new Error (err.message);
    } finally {
        await browser.close();
    }
};
