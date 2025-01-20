import path from 'path';
import * as vscode from 'vscode';
import fs from 'fs/promises';


export const createFile = async (url: string, lang: string) => {
    // Extract problem name from URL
    const problemName = url.split('problems').pop()?.split('/')[1].trim();
    console.log(`problemName: ${problemName}`);

    if (!problemName){
        throw new Error("No problem name in the url");
    }

    // Language selection
    const extension: { [key: string]: string } = {
            "C++": "cpp",
            "Python": "py",
    };

    // Check if supported language
    if (!extension[lang]) {
        throw new Error(`Unsupported language: ${lang}`);
    }

    // Ensure workspace folder is open
    const dirPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!dirPath){
        throw new Error("Please open a folder in VS Code");
    }

    // Creating File
    const fileName = `${problemName}.${extension[lang]}`;
    console.log(fileName);

    // Corrected Path
    const filePath = path.join(dirPath, fileName);
    console.log(filePath);
    
    let fileExitst = false;
    try{
        // Check if file already exist
        await fs.access(filePath);
        fileExitst = true;
    } catch {}

    if (!fileExitst){
        try{
            // Create file if doesn't exist
            await fs.writeFile(filePath, '');
            console.log("File created");
        } catch (err: any){
            throw new Error(`Error creating file: ${err.message}`);
        }
    }
    
    try{
        // Open the File
        const doc = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(doc);
    } catch(err: any){
        throw new Error(`Error opening file: ${err.message}`);   
    }

    return fileExitst ? `File already exists: ${fileName}` : `File created successfully: ${fileName}`;
};