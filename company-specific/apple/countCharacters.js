/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  const originalCharMap = chars.split("").reduce((acc, c) => {
    acc.set(c, (acc.get(c) ?? 0) + 1);
    return acc;
  }, new Map());

  console.log(charMap);
  let result = 0;
  for (const word of words) {
    const wordChars = word.split("");
    const charMap = new Map(originalCharMap);
    let isValid = true;

    for (const c of wordChars) {
      if (!charMap.has(c)) {
        isValid = false;
        break;
      }

      const val = charMap.get(c);
      if (val === 1) {
        charMap.delete(c);
      } else {
        charMap.set(c, val - 1);
      }
    }

    if (!isValid) {
      continue;
    }

    result += word.length;
  }
  return result;
};
