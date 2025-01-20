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


---

## 🚀 Installation

1. Open VS Code and go to the Extensions tab.
2. Search for **leet-cph** and hit Install.
3. You're ready to start testing LeetCode solutions with ease!

---

## 🔧 Usage

### Fetch Test Cases
1. Open a Folder in VS Code.̥
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Run the Command: `CPH: Fetch Test Cases`.
4. Alternatively, use the keyboard shortcut: `Ctrl+Alt+A`.
5. Enter the **LeetCode problem URL** (e.g., `https://leetcode.com/problems/two-sum`).
6. Select your programming language (`C++` or `Python`).
7. The extension creates:
   - A code file (`<problem_name>.<extension>`).
   - Test Cases are stored under folder `.leet-cph\<problem_name\` as `input_<num>.txt` and `output_<num>.txt`.  

### Run Test Cases
1. Write your solution in the generated file.
2. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Run the command: `CPH: Run Test Cases`.
4. Alternatively, use the keyboard shortcut: `Ctrl+Alt+B`
5. The extension will:
   - Execute your code for each input test case.
   - Compare your code's output with the expected output and give verdict.
   - Display the results in the output channel.

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

- Ensure that the language you're coding in (`Python` or `C++`) is installed on your system.

---

## 💡 Future Enhancements

- Extend Language support to include Java, JavaScript etc.
- Allow input array/matrix size specification for better usability and readability.

---

## 🤝 Contributing

We love open-source contributions! Fork the repository, submit a pull request, or open an issue to discuss new features, bugs, or suggestions.

---

## License

This extension is licensed under the [MIT License](LICENSE).