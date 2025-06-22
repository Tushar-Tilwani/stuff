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

/*
 * Complete the 'getWordsFromPhoneNumber' function below.
 *
 * The function accepts STRING phoneNumber as parameter.
 * The function is expected to return a STRING_ARRAY.
 */
function getWordsFromPhoneNumber(phoneNumber) {
  // Write your code here
  const nums = phoneNumber.split("");
  const result = [];
  helper(nums, [], 0, result);
  return result.length === 0 || result[0] === "" ? [-1] : result;
}

function helper(nums, slate, index, result) {
  if (index === nums.length) {
    result.push(slate.join(""));
    return;
  }

  // add empty incase of nothing found i.e [""]
  const chars = CHARS_MAP[nums[index]] || [""];

  for (const char of chars) {
    slate.push(char);
    helper(nums, slate, index + 1, result);
    slate.pop();
  }
}

console.log(getWordsFromPhoneNumber("1001"));
