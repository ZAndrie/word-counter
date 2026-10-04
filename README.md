# Word & Line Counter CLI

A small Node.js command-line tool that reads text files and prints the number of lines, words, and characters.

## Requirements
- Node.js 18 or newer

## Setup
```bash
git clone <your-repo-url>
cd word-counter
```
No dependencies to install.

## Usage
```bash
npm start sample.txt
```

Options go after `--` so npm passes them to the script:

```bash
npm start -- sample.txt notes.txt        # multiple files
npm start -- sample.txt --top            # 5 most common words
npm start -- sample.txt --ignore-empty   # don't count blank lines
```

You can also run it directly: `node index.js sample.txt --top`

## Example output
```text
File: sample.txt
Lines: 13
Words: 129
Characters: 756
```

## Project structure
- `index.js` – CLI: argument parsing, file reading, output
- `lib/counter.js` – counting logic (`countText`, `topWords`)
- `sample.txt` – example input

## Error handling
Missing files, directories, and other read errors print a clear message and set a non-zero exit code.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/098d57e6-9213-4078-bc71-6007dc91f4b7" />

