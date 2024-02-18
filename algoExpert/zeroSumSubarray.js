function zeroSumSubarray(nums) {
  const sumSet = new Set();

  let sum = 0;
  for (const num of nums) {
    sum += num;
    if (sumSet.has(sum)) {
      return true;
    }
    sumSet.add(sum);
  }

  return false;
}

// Do not edit the line below.
exports.zeroSumSubarray = zeroSumSubarray;
