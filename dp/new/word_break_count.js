const MOD = Math.pow(10, 9) + 7;
/**
 * @param {list_str} dictionary
 * @param {str} txt
 * @return {int32}
 */
function word_break_count(dictionary, txt) {
  const dictionarySet = new Set(dictionary);
  const end = txt.length;
  const TABLE = new Array(end + 1).fill(0);
  TABLE[end] = 1;
  for (let i = end - 1; i >= 0; i--) {
    for (let j = i + 1; j <= end; j++) {
      const subStr = txt.slice(i, j);
      if (dictionarySet.has(subStr)) {
        TABLE[i] += TABLE[j] % MOD;
      }
    }
    TABLE[i] = TABLE[i] % MOD;
  }
  // Write your code here.
  return TABLE[0];
}

console.log(word_break_count(["a", "b", "c", "bc"], "abc"));
