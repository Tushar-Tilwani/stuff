/*
 * Complete the neuronyms function below.
 */
function neuronyms(word) {
  if (word.length < 4) {
    return [];
  }
  /*
   * Write your code here.
   */
  const result = [];
  let len = word.length;
  const max = len - 3;
  for (let i = 0; i < max; i++) {
    // IT TOOK ME MORE THAN 30 MINUTES TO COME UP WITH max-i huh!!!
    for (let j = 0; j < max - i; j++) {
      result.push(
        `${word.slice(0, j + 1)}${i + 2}${word.slice(max + i + j, len)}`
      );
    }
  }
  return result;
}
// [ 'n2led', 'na2ed', 'nai2d', 'n3ed', 'na3d', 'n4d' ]
// ["n4d", "na3d", "n3ed", "n2led", "na2ed", "nai2d"]
// [ 'n4d', 'na3d', 'n3ed', 'nai2d', 'n2led' ]

console.log(neuronyms("abcd"));
