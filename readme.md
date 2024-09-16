# Catalog Placement Assignment

This repository contains a JavaScript script (`task.js`) that processes input data from `input0.json` to compute the constant term `c` using Lagrange interpolation. The result is output both to the terminal and written to `output0.txt`.

## How to run and test the code locally

### Prerequisites

- Node.js: Ensure Node.js is installed on the system. Download it from the [official website](https://nodejs.org/).

### Cloning the repository

- To clone the repo locally, run the following command:
```bash
git clone https://github.com/TanmayDoesAI/Catalog-assignment.git
```
- To get in the folder use the `cd` command
```bash
cd Catalog-assignment
```

### Files Required

- `task.js`: The main JavaScript code for processing the data.
- `input0.json`: The input file containing the test data.
- `output0.txt`: The file where the output will be written.

There are also `input1.json` and `output1.txt` as to keep both the given test cases.

### Testing with Custom Input

To test the code with a new test case:

1. Update `input0.json`: Modify `input0.json` with your new test data.

2. Run the Script:

   ```bash
   node task.js
   ```

   This command will execute the script, which reads `input0.json`, processes the data, and computes the constant term `c`.

3. Check the Output:

   - Terminal: The computed value of `c` will be displayed in the terminal.
   - Output File: The same result is written to `output0.txt`.

   - The output would look like:
   ```bash
   Constant term (c): 28735619723864
   ```


## Task 2: for task 2 run task2.js using the same input1.json to get output in output.txt
- you may need math.js to install it use the following command:
```
npm install mathjs
```
then run
```bash
node task2.js
```
and you would see the output in the terminal and also in the output.txt file