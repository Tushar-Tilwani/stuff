function longestCommonPrefix(strs: string[]): string {
  let prefixSoFar = strs[0].split("");
  for (let i = 1; i < strs.length; i++) {
    const word = strs[i];
    const localPrefix = [];
    for (let j = 0; j < Math.min(prefixSoFar.length, word.length); j++) {
      if (prefixSoFar[j] !== word[i]) {
        continue;
      }
      localPrefix.push(word[i]);
    }
    if (localPrefix.length === 0) {
      return "";
    }
    prefixSoFar = localPrefix;
  }
  return prefixSoFar.join("");
}
