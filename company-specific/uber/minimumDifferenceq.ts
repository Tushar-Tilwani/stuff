function minimumDifference(nums: number[]): number {
  const partLength = Math.floor(nums.length / 3);
  const result = [Infinity];
  for (let i = partLength; i <= 2 * partLength; i++) {
    const maxResult: [number] = [-Infinity];
    const minResult: [number] = [Infinity];
    getHelper([], 0, 0, nums, minResult, false, i);
    getHelper([], i, 0, nums, maxResult, true, nums.length);
    result[0] = Math.min(result[0], minResult[0] - maxResult[0]);
  }

  return result[0];
}

function getHelper(
  path: number[],
  index: number,
  sum: number,
  nums: number[],
  result: [number],
  isMax: boolean,
  maxIndex: number
) {
  const partLength = Math.floor(nums.length / 3);
  if (path.length === partLength) {
    result[0] = isMax ? Math.max(sum, result[0]) : Math.min(sum, result[0]);
    return;
  }
  if (index === maxIndex) {
    return;
  }

  path.push(nums[index]);
  getHelper(path, index + 1, sum + nums[index], nums, result, isMax, maxIndex);
  path.pop();

  getHelper(path, index + 1, sum, nums, result, isMax, maxIndex);
}
