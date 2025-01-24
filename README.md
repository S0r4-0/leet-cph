# Leet CPH: Test Your LeetCode Solutions Like a Pro 🚀

Supercharge your competitive programming workflow with CPH-Leetcode, a Visual Studio Code extension that brings LeetCode problem test cases directly to your editor. No more juggling between browser tabs and VS Code—fetch test cases, run them, and instantly check the correctness of your solution, all within the same environment. Perfect for competitive programmers who want a smoother and faster coding experience! ⚡

---

## 🎯 Features

### 1. Fetch Test Cases
Automatically grabs test cases from LeetCode problem URLs. No more manual input!

The **leet-cph** extension simplifies fetching test cases for LeetCode problems. By providing a problem URL, the extension automatically retrieves both the input and output test cases. These are saved in dedicated folders (`.leet-cph/<problem_name>/input_<num>.txt` for inputs and `.leet-cph/<problem_name>/output_<num>.txt` for outputs), making it easy to access and reuse them later.

### 2. Run Test Cases 
Once you've written your solution, the extension lets you run it directly from VS Code, using the fetched test cases. It compares your output against the expected one and provides a **verdict** (right or wrong). You'll get a detailed breakdown with the input, expected output, your code’s output, and pass/fail results, helping you fine-tune your solution.

### 3. Modify Test Cases
Need to customize or test with your own input? The extension lets you modify the fetched test cases! You can:
- Edit input files (`.leet-cph/<problem_name>/input_<num>.txt`) directly.
- Customize expected outputs in the output files (`.leet-cph/<problem_name>/output_<num>.txt`).
- Add new test cases to further test your solution’s robustness.
- Keep your custom test cases organized and re-run them anytime.

### 4. Multi-Language Support  
Currently supports C++ and Python. We plan to expand to more languages like Java and JavaScript in the future!

### 5. Supports all input formats, including Vectors and Matrices.
The first line of the input file specifies the dimensions for all `Vectors` and `Matrices`:
-  `n` for `Vectors`.
-  `n, m` for `Matrices`.
Users are advised to refer to the `input.txt` file to ensure `proper formatting` of test cases.

---

## 🚀 Installation

- **Installing Dependencies**
1. Clone the repository:
   ``` 
   git clone https://github.com/S0r4-0/leet-cph.git 
   ```

2. Navigate to the Cloned repository:
   ```
   cd leet-cph
   ```

3. Ensure npm is installed
   ```
   npm -v
   ```
   If npm is not installed, you can install it by following the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
   
4. Install the required dependencies using npm:
   ```
   npm install
   ```
   
- **Installing Extension**
1. Open VS Code and go to the Extensions tab.
2. Search for **leet-cph** and hit install.
3. You're ready to start testing LeetCode solutions with ease!
4. The cloned repository can be uninstalled now

- **Developer Setup**
1. Open repository in vscode
   ```
   code .
   ```

2. Start Debugging: `Ctrl+F5`
3. The extension can now be tested in the development VS Code window.

---

## 🔧 Usage

### Fetch Test Cases
1. Open a Folder in VS Code.̥
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Run the Command: `CPH: Fetch Test Cases`.
4. Alternatively, use the keyboard shortcut: `Ctrl+Alt+A`.
5. Enter the **LeetCode problem URL** (e.g., `https://leetcode.com/problems/two-sum`).
6. Select your programming language (`C++` or `Python`).
7. The extension will:
   - Create a code file (`<problem_name>.<extension>`).
   - Store test cases in the `.leet-cph\<problem_name\` folder as `input_<num>.txt` and `output_<num>.txt`.  

### Run Test Cases
1. Write your solution in the generated file after properly  reviewing the the `input_<num>.txt` files.
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Run the command: `CPH: Run Test Cases`.
4. Alternatively, use the keyboard shortcut: `Ctrl+Alt+B`
5. The extension will:
   - Execute your code for each input test case.
   - Compare your code's output with the expected output.
   - Display the results in the output channel.
   - Provide a **verdict** (e.g., Passed, Failed).

### Modify Test Cases
1. Navigate to the `.leet-cph/<problem_name>/` folder.
2. Open the `input_<num>.txt` files to modify or add new input test cases.
3. Edit the `output_<num>.txt` files to update the expected outputs.
4. Save the changes and re-run the tests using the **Run Test Cases** command.
---


## ⚙️ Extension Commands

| Command                          | Description                                | Shortcut         |
|----------------------------------|--------------------------------------------|------------------|
| `CPH: Fetch Test Cases` | Fetch test cases from a LeetCode URL.      | `Ctrl+Alt+A`     |
| `CPH: Run Test Cases`  | Run your solution and compare outputs.     | `Ctrl+Alt+B`     |


---

## 📋 Requirements

- Ensure `Node` and `npm` is installed in the system. 
- Ensure that the language you're coding in (`Python` or `C++`) is installed on your system.

---

## 💡 Future Enhancements

- Extend Language support to include Java, JavaScript etc.
- Resolve issues with the extension bundle not properly including dependencies, requiring users to have them installed on their devices.

---

## 🤝 Contributing

We love open-source contributions! Fork the repository, submit a pull request, or open an issue to discuss new features, bugs, or suggestions.

---

## License

This extension is licensed under the [MIT License](LICENSE).