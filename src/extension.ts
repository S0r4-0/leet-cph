// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import path from 'path';
import { getTestCases } from './fetchTestCases';
import { createFile } from './createFile';
import { codeExec } from './runTestCases';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cph-leetcode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const getTestCasesCommand = vscode.commands.registerCommand('cph-leetcode.getTestCases', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from cph-leetcode!');

		// Prompt for LeetCode URL
		const url = await vscode.window.showInputBox({
			placeHolder: "Enter the URL of the Leetcode problem",
			ignoreFocusOut: true,
			
			validateInput: (input: string) => {
				// Basic validation to ensure it's a valid URL
				const trimInput = input.trim();
				const regex = /^(https?:\/\/)(www\.)?leetcode\.com\/problems\/[a-zA-Z0-9-]+\/?.*$/i;
				return regex.test(trimInput) ? null : 'Please enter a valid LeetCode problem URL';
			},
		});

		// No URL entered
		if (!url){
			vscode.window.showErrorMessage("URL is required");
			return;
		}

		try{
			// Fetch Test Cases
			await getTestCases(url);
			vscode.window.showInformationMessage("Test cases fetched successfully!");
			console.log("Current Working Directory: ", process.cwd());
		} catch (err : any) {
			vscode.window.showErrorMessage(err.message);
			return;
		}

		// Prompt for File Creation
		const lang = await vscode.window.showQuickPick(
			["C++", "Python"],
			{
				placeHolder: "Select your preferred programming language",
				canPickMany: false,
				ignoreFocusOut: true,
			}
		);

		// No File Created
		if (!lang) {
			vscode.window.showErrorMessage("New file not created.");
			return;
		}

		try{
			// File Creation
			const message = await createFile(url, lang);
			vscode.window.showInformationMessage(message);
			console.log("File created");
		} catch (err: any){
			vscode.window.showErrorMessage(err.message);
			return;
		}
	});

	const runTestCasesCommand = vscode.commands.registerCommand('cph-leetcode.runTestCases', async () => {
		const editor = vscode.window.activeTextEditor;
		
		// A file must be open 
		if (!editor){
			vscode.window.showErrorMessage("no file is currently open");
			return;
		}
		
		// Path and ext
		const filePath = editor.document.fileName;
		const fileExt = path.extname(filePath);
		console.log("File Path: ", filePath);

		const lang: { [key: string]: string } = {
			'.cpp': "C++",
			'.py': "Python"
		};

		try{
			// Run Test Cases
			await codeExec(filePath, lang[fileExt]);

			console.log("Test cases are running...");
			vscode.window.showInformationMessage("Test cases ran successfully!");
		} catch (err: any){
			vscode.window.showErrorMessage(err.message);
		}
	});

	context.subscriptions.push(getTestCasesCommand, runTestCasesCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
