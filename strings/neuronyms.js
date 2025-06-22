/*
 * Complete the neuronyms function below.
 */
function neuronyms(word) {
  const result = [];
  const len = word.length;
  if (len < 4) {
    return result;
  }
  for (let i = 1; i <= len - 2; i++) {
    const prefix = word.slice(0, i);
    const leftChars = len - (i + 2);
    for (let j = 1; j <= leftChars; j++) {
      const suffix = word.slice(len - j, len);
      const removedChars = len - i - j;
      result.push(prefix + removedChars + suffix);
    }
  }
  return result;
}
// [ 'n2led', 'na2ed', 'nai2d', 'n3ed', 'na3d', 'n4d' ]
// ["n4d", "na3d", "n3ed", "n2led", "na2ed", "nai2d"]
// [ 'n4d', 'na3d', 'n3ed', 'nai2d', 'n2led' ]

console.log(neuronyms("nailed"));
