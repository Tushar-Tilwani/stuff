function wordPattern(pattern: string, s: string): boolean {
  const patternArr = pattern.split("");
  const words = s.split(" ");
  const checkMap = new Map();
  const wordSet = new Set();
  if (patternArr.length !== words.length) {
    return false;
  }

  for (let i = 0; i < words.length; i++) {
    const char = patternArr[i];
    const word = words[i];
    if (!wordSet.has(word)) {
      if (checkMap.has(char)) {
        // char already taken
        return false;
      }
      checkMap.set(char, word);
      wordSet.add(word);
      continue;
    }
    if (checkMap.get(char) !== word) {
      return false;
    }
  }

  return true;
}
