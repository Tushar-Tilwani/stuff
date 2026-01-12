function fullJustify1(words: string[], maxWidth: number): string[] {
  const result: string[] = [];
  const lines = getLines(words, maxWidth);
  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const len = line.reduce((acc, word) => acc + word.length, 0);
    const totalSpaces = maxWidth - len;
    const numOfSpaces = Math.floor(totalSpaces / line.length);
    let extraSpaces = totalSpaces % line.length;
    const sep = new Array(numOfSpaces).fill(" ").join("");
    const lineStr = [];
    for (const word of line) {
      lineStr.push(word);
      lineStr.push(sep);
      if (extraSpaces > 0) {
        lineStr.push(" ");
        extraSpaces -= 1;
      }
    }
    result.push(lineStr.slice(0, -1).join(""));
  }
  result.push([...lines[lines.length - 1], ""].join(" "));
  return result;
}

function getLines1(words: string[], maxWidth: number) {
  const lines = [];
  let i = 0;
  let len = 0;
  let line = [];
  while (i < words.length) {
    const word = words[i];
    if (len + word.length - 1 >= maxWidth) {
      // -1 for space as this can be last word may not need space
      lines.push(line);
      line = [];
      len = 0;
    }
    len += word.length + 1; // +1 for space;
    i += 1;
    line.push(word);
  }
  lines.push(line);
  return lines;
}
