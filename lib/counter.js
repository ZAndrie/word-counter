// Pure counting logic, kept separate from the CLI so it is easy to test and reuse.

export function countText(text, { ignoreEmpty = false } = {}) {
  let lines = text.split(/\r?\n/);
  // A trailing newline creates one extra empty "line" at the end; drop it.
  if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  if (ignoreEmpty) lines = lines.filter((line) => line.trim() !== "");

  const words = text.split(/\s+/).filter(Boolean);

  return {
    lines: lines.length,
    words: words.length,
    characters: text.length,
    wordList: words,
  };
}

export function topWords(wordList, n = 5) {
  const freq = new Map();
  for (const raw of wordList) {
    // Lowercase and strip leading/trailing punctuation: "Hello," -> "hello"
    const word = raw.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
    if (!word) continue;
    freq.set(word, (freq.get(word) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n);
}
