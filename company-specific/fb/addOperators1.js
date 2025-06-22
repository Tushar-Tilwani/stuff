// Fail

/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
var addOperators = function (num, target) {
  const result = [];
  getAllOperations(num, 0, [], result);
  //   console.log(result);
  return result.filter((expression) => eval(expression) === target);
};

function getAllOperations(nums, startIndex, pre, cur, slate, result) {
  if (startIndex === nums.length - 1) {
    slate.push(nums[startIndex]);
    result.push(slate.join(""));
    slate.pop();
    return;
  }
  const value = parseInt(nums[startIndex]);
  slate.push(nums[startIndex]);

  if (nums[startIndex] !== "0") {
    slate.push("");
    getAllOperations(nums, startIndex + 1, slate, result);
    slate.pop();
  }

  slate.push("+");
  getAllOperations(nums, startIndex + 1, cur, cur + value, slate, result);
  slate.pop();

  slate.push("-");
  getAllOperations(nums, startIndex + 1, cur, cur - value, slate, result);
  slate.pop();

  slate.push("*");
  getAllOperations(nums, startIndex + 1, cur, cur + value, slate, result);
  slate.pop();

  slate.pop();
}

console.log(addOperators("1000000009", 9));
