function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  helper(0, nums, [], result);
  return result;
}

function helper(index: number, nums: number[], slate: number[], result: number[][]) {
  if (index === nums.length) {
    result.push(slate.slice(0));
    return;
  }
  for (let i = index; i < nums.length; i++) {
    slate.push(nums[i]);
    swap(nums, i, index);
    helper(index + 1, nums, slate, result);
    swap(nums, i, index);
    slate.pop();
  }
}

function swap(arr: unknown[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
