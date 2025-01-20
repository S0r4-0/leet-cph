import path from 'path';
import * as vscode from 'vscode';
import fs from 'fs/promises';
import { exec } from 'child_process';

const outputChannel = vscode.window.createOutputChannel("leet-CPH");

// Language Configuration
const config = vscode.workspace.getConfiguration();

const cppCompile: string = config.get<string>("cph.language.cpp.compile", "g++");
const cppOutArg: string = config.get<string>("cph.language.cpp.OutputArg", "-o");
const pythonRun: string = config.get<string>("cph.language.python.run", "python3");

const languageCommands: Record<string, (filePath: string, problemName: string, inputFilePath: string) => string> = {
    Python: (filePath, _, inputFilePath) => `${pythonRun} "${filePath}" < "${inputFilePath}"`,
    'C++': (filePath, problemName, inputFilePath) =>
        `${cppCompile} "${filePath}" ${cppOutArg} "${problemName}" && "${problemName}" < "${inputFilePath}"`,
};

export const codeExec = async (filePath: string, lang: string) => {
    // Paths
    const dirPath = path.dirname(filePath);
    const problemName = path.join(dirPath, path.parse(filePath).name);
    const finalDirPath = path.join(dirPath, '.leet-cph', path.parse(filePath).name);

    // Check language support
    const commandGenerator = languageCommands[lang];
    if (!commandGenerator){
        throw new Error(`File Format not supported. Please select .cpp or .py file`);
    }

    // Ensure test case directory exists
    try{
        await checkFileExists(finalDirPath);
    } catch (err: any) {
        throw err;
    }

    console.log("Dir: ", finalDirPath);

    // Opening files
    const files = await fs.readdir(finalDirPath);
    console.log(files);

    const inputFiles = files.filter(file => file.startsWith(`input`) && file.endsWith('.txt'));
    const outputFiles = files.filter(file => file.startsWith(`output`) && file.endsWith('.txt'));

    if (inputFiles.length !== outputFiles.length) {
        throw new Error("Mismatch in the number of input and output files");
    }

    outputChannel.clear();
    outputChannel.show(true);

    // Running each test case
    for (let i = 0; i < inputFiles.length; i++){
        const inputFilePath = path.join(finalDirPath, inputFiles[i]);
        const outputFilePath = path.join(finalDirPath, outputFiles[i]);

        console.log(inputFilePath, outputFilePath);
        
        
        try{
            await checkFileExists(inputFilePath);
            await checkFileExists(outputFilePath);
        } catch (err: any){
            throw err;
        }

        const command = commandGenerator(filePath, problemName, inputFilePath);
        console.log("Command: ", command);

        try{
            const output = (await runCommand(command)).trim();
            console.log(output);

            await compareOutput(inputFilePath, output, outputFilePath, outputChannel);

        } catch(err: any) {
            throw err;
        }
    }

};

const compareOutput = async (inputFile: string, output: string, expectedOutputFile: string, outputChannel: any) => {
    try{
        const input = await fs.readFile(inputFile, 'utf-8');
        const expectedOutput = await fs.readFile(expectedOutputFile, 'utf-8');

        outputChannel.appendLine("Input: ");
        outputChannel.appendLine(input);

        outputChannel.appendLine("Output: ");
        outputChannel.appendLine(output);

        outputChannel.appendLine("Answer: ");
        outputChannel.appendLine(expectedOutput);
        
        outputChannel.appendLine('');

        if (output.trim() !== expectedOutput.trim()){
            throw new Error(`Test case failed. Expected: '${expectedOutput}',  Found: '${output}'`);
        }

    } catch (err: any) {
        throw err;
    }
};

const runCommand = (command: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) =>{
            if (error){
                reject(new Error(`Error in running file: ${error.message}`));
            } else {
                if (stderr){
                    vscode.window.showWarningMessage(`Warning: ${stderr}`);
                }
                resolve(stdout);
            }
        });
    });
};


const checkFileExists = async (filePath: string) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (err: any) {
        console.error(`Error File Access: ${err.message}`);
        throw new Error(`Failed to access file: ${filePath}. Error: ${err.message}`);
    }
};