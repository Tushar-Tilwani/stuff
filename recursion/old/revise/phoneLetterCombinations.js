/**
 * @param {string} digits
 * @return {string[]}
 */
const PHONE_MAP = {
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"]
};
var letterCombinations = function(digits) {
  if (!digits) {
    return [];
  }
  const result = [];
  _letterCombinations(digits.split(""), 0, [], result);
  return result;
};

function _letterCombinations(digits, index, path, result) {
  if (index === digits.length) {
    result.push(path.join(""));
    return;
  }

  const letters = PHONE_MAP[digits[index]];
  for (const letter of letters) {
    path.push(letter);
    _letterCombinations(digits, index + 1, path, result);
    path.pop();
  }
  return result;
}

console.log(letterCombinations("23"));
