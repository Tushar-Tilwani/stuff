function splitArray(nums: number[], k: number): number {
  let start = Math.max(...nums);
  let end = nums.reduce((acc, num) => acc + num, 0);
  while (start <= end) {
    const mid = start + Math.floor((end - start) / 2);
    const midK = getK(nums, mid);
    if (midK <= k) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return start;
}

function getK(nums: number[], capacity: number) {
  let sum = 0;
  let k = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] + sum < capacity) {
      sum = 0;
      k += 1;
    }
    sum += nums[i];
  }
  return k;
}
