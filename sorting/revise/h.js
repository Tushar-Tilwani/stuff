/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = [];
  const PAREN_MAP = {
    ")": "(",
    "]": "[",
    "}": "{"
  };
  const strArr = s.split("");

  for (const char of strArr) {
    if (!PAREN_MAP[char]) {
      stack.push(char);
    } else if (stack.pop() !== PAREN_MAP[char]) {
      return false;
    }
  }

  return stack.length === 0;
};

console.log(isValid("()[([])]{}"));

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  const DP_TABLE = [];
  for (let i = 0; i <= amount; i++) {
    DP_TABLE[i] = Infinity;
  }
  for (const coin of coins) {
    DP_TABLE[coin] = 1;
  }

  for (let i = 1; i <= amount; i++) {
    let value = Infinity;
    for (const coin of coins) {
      value = Math.min(DP_TABLE[i - coin], value);
    }
    DP_TABLE[i] = value + 1;
  }
  console.log(DP_TABLE);

  return 0;
};
