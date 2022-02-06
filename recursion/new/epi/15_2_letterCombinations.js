const CHARS_MAP = {
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"],
};

/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations(digits) {
  if (!digits) {
    return [];
  }
  const result = [];
  helper(digits, 0, [], result);
  return result;
}

function helper(digits, index, slate, result) {
  if (index === digits.length) {
    result.push(slate.join(""));
    return;
  }

  const vals = CHARS_MAP[digits[index]];

  if (!vals) {
    helper(digits, index + 1, slate, result);
    return;
  }

  for (const val of vals) {
    slate.push(val);
    helper(digits, index + 1, slate, result);
    slate.pop();
  }
}
