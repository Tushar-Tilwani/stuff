// Fail
/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
var addOperators = function (num, target) {
  const result = [];
  getAllOperations(num, 0, [], result, target);
  //   console.log(result);
  return result;
};

function getAllOperations(nums, startIndex, slate, result, target) {
  if (startIndex === nums.length - 1) {
    slate.push(nums[startIndex]);
    const exp = slate.join("");
    if (eval(exp) === target) {
      result.push(exp);
    }

    slate.pop();
    return;
  }
  slate.push(nums[startIndex]);

  if (nums[startIndex] !== "0") {
    slate.push("");
    getAllOperations(nums, startIndex + 1, slate, result, target);
    slate.pop();
  }

  slate.push("+");
  getAllOperations(nums, startIndex + 1, slate, result, target);
  slate.pop();

  slate.push("-");
  getAllOperations(nums, startIndex + 1, slate, result, target);
  slate.pop();

  slate.push("*");
  getAllOperations(nums, startIndex + 1, slate, result, target);
  slate.pop();

  slate.pop();
}

console.log(addOperators("1000000009", 9));
