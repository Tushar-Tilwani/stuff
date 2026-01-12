function search(nums: number[], target: number): boolean {
  let end = nums.length - 1;
  let start = 0;
  while (nums[start] === nums[start + 1]) {
    start++;
  }

  while (nums[end] === nums[end - 1]) {
    end--;
  }
  return helper(nums, target, start, end);
}

function helper(nums: number[], target: number, start: number, end: number): boolean {
  const pivot = nums[end];
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (nums[mid] === target) {
      return true;
    }
    if (target < pivot) {
      if (target < nums[mid]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    } else {
      if (target < nums[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
  }
  return false;
}
