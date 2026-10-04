import { readFile } from "node:fs/promises";
import path from "node:path";
import { countText, topWords } from "./lib/counter.js";

// ANSI color helpers
const c = {
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

const args = process.argv.slice(2);
const showTop = args.includes("--top");
const ignoreEmpty = args.includes("--ignore-empty");
const files = args.filter((a) => !a.startsWith("--"));

if (files.length === 0) {
  console.log("Usage: npm start -- <file> [more files] [--top] [--ignore-empty]");
  console.log("Example: npm start sample.txt");
  process.exit(1);
}

for (const file of files) {
  const filePath = path.resolve(file);
  try {
    const text = await readFile(filePath, "utf8");
    const result = countText(text, { ignoreEmpty });

    console.log(`${c.bold("File:")} ${c.cyan(file)}`);
    console.log(`${c.bold("Lines:")} ${c.green(result.lines)}`);
    console.log(`${c.bold("Words:")} ${c.green(result.words)}`);
    console.log(`${c.bold("Characters:")} ${c.green(result.characters)}`);

    if (showTop) {
      console.log(c.bold("Top 5 words:"));
      for (const [word, count] of topWords(result.wordList, 5)) {
        console.log(`  ${word} ${c.dim("×")} ${count}`);
      }
    }
    console.log();
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(c.red(`Error: file not found: ${file}`));
    } else if (err.code === "EISDIR") {
      console.error(c.red(`Error: ${file} is a directory, not a file`));
    } else {
      console.error(c.red(`Error reading ${file}: ${err.message}`));
    }
    process.exitCode = 1;
  }
}
