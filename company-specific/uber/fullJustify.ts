function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = [];
  const lines = getLines(words, maxWidth);
  for (let i = 0; i < lines.length; i++) {
    if (i === lines.length - 1) {
      result.push(getLastSentence(lines[i], maxWidth));
      continue;
    }
    result.push(getGenericSentence(lines[i], maxWidth));
  }
  return result;
}

function getGenericSentence(line: string[], maxWidth: number): string {
  if (line.length === 1) {
    return getLastSentence(line, maxWidth);
  }

  const numOfCharLen = line.reduce((acc, word) => acc + word.length, 0);
  const numOfJoinWords = line.length - 1;
  const totalSpaces = maxWidth - numOfCharLen;
  const evenSpaces = Math.floor(totalSpaces / numOfJoinWords);
  const sep = new Array(evenSpaces).fill(" ").join("");
  let oddSpaces = totalSpaces % numOfJoinWords;
  const sentence = [];
  for (let i = 0; i < line.length - 1; i++) {
    const word = line[i];
    sentence.push(word);
    sentence.push(sep);
    if (oddSpaces > 0) {
      sentence.push(" ");
      oddSpaces--;
    }
  }

  sentence.push(line[line.length - 1]);

  return sentence.join("");
}

function getLastSentence(line: string[], maxWidth: number): string {
  const lineStr = line.join(" ");
  const extraSpaces = maxWidth - lineStr.length;
  const sep = new Array(extraSpaces).fill(" ").join("");
  return lineStr + sep;
}

function getLines(words: string[], maxWidth: number) {
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
