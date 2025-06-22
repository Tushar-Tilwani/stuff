const MOD = Math.pow(10, 9) + 7;

/**
 * @param {list_str} dictionary
 * @param {str} txt
 * @return {int32}
 */
function word_break_count(dictionary, txt) {
  const dictionarySet = new Set(dictionary);
  // Write your code here.
  return helper(txt, 0, dictionarySet, new Map());
}

function helper(txt, startIndex, dictionarySet, memo) {
  if (memo.has(startIndex)) {
    return memo.get(startIndex);
  }
  let result = 0;
  const end = txt.length;
  if (startIndex === end) {
    return 1;
  }
  for (let i = startIndex; i < end; i++) {
    const part = txt.slice(startIndex, i + 1);
    if (dictionarySet.has(part)) {
      result += helper(txt, i + 1, dictionarySet, memo);
    }
  }
  memo.set(startIndex, result % MOD);
  return memo.get(startIndex);
}

