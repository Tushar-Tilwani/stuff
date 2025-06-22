/*
 * Complete the function below.
 */
const MOD = 10e7 + 7;
function getProductArray(nums) {
  // Write your code here.
  const len = nums.length;
  const right = new Array(len).fill(1);
  const left = new Array(len).fill(1);
  const result = [];

  for (let i = 1; i < len; i++) {
    left[i] = (left[i - 1] * nums[i - 1]) % MOD;
  }

  for (let i = len - 2; i >= 0; i--) {
    right[i] = (right[i + 1] * nums[i + 1]) % MOD;
  }

  for (let i = 0; i < len; i++) {
    result[i] = (left[i] * right[i]) % MOD;
  }

  return result;
}

let f = [-1000000000, -1000000000];
console.log(getProductArray(f));
