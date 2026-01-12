function fullJustify(words: string[], maxWidth: number): string[] {
  const result = [];
  const lines = getLines(words, maxWidth);
  for (let i = 0; i < lines.length - 1; i++) {
    result.push(getGenericSentence(lines[i], maxWidth));
  }
  result.push(getLastSentence(lines[lines.length - 1], maxWidth));
  return result;
}

function getGenericSentence(line: string[], maxWidth: number) {
  if (line.length === 1) {
    return getLastSentence(line, maxWidth);
  }
  const totalCharLength = line.reduce((acc, word) => acc + word.length, 0);
  const spacesLeft = maxWidth - totalCharLength;
  const minSpacesPerWord = Math.floor(spacesLeft / (line.length - 1));
  let extraSpacesLen = spacesLeft % (line.length - 1);
  const minSpacesStr = new Array(minSpacesPerWord).fill(" ").join("");
  const result: string[] = [];
  for (const word of line) {
    result.push(word);
    result.push(minSpacesStr);
    if (extraSpacesLen > 0) {
      result.push(" ");
      extraSpacesLen--;
    }
  }

  return result.slice(0, -1).join("");
}

function getLastSentence(line: string[], maxWidth: number) {
  const lineStr = line.join(" ");
  const leftSpaces = maxWidth - lineStr.length;
  const spaces = new Array(leftSpaces).fill(" ").join("");
  return `${lineStr}${spaces}`;
}

function getLines(words: string[], maxWidth: number): string[][] {
  const lines: string[][] = [];
  let len = 0;
  let i = 0;
  let line: string[] = [];
  while (i < words.length) {
    const word = words[i++];
    if (len + word.length - 1 >= maxWidth) {
      lines.push(line);
      len = 0;
      line = [];
    }
    len += word.length + 1;
    line.push(word);
  }
  lines.push(line);
  return lines;
}
