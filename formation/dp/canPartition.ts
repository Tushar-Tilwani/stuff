// YOU COULD NOT DO THIS PROBLEM DESPITE SOLVING IT A WEEK AGO
// PLEASE DO NOT HURRY DP. IT WILL BIT YOU BACK IN THE ASS

function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((acc, val) => acc + val, 0);
  if (sum % 2 !== 0) {
    return false;
  }
  const len = nums.length;
  const target = sum / 2;
  const TABLE = new Array(len + 1).fill(null).map(() => new Array(target + 1).fill(false));
  // Idea is that I can choose a num or not choose num
  // if i don't choose a number
  // f(n,k) = f(n-1,k) [Did not choose a number] + f(n-1,k-nums[n])[Choosed a number] so the new target shifts

  // first if target is 0 we can safely mark the entire row as true. Becuase we can simply not choose any value for the set. That is empty set.
  for (let i = 0; i <= len; i++) {
    TABLE[i][0] = true;
  }
  // now if you check the recurrence equation mostly depend upon i-1
  // so row by row

  for (let i = 1; i <= len; i++) {
    for (let j = 0; j <= target; j++) {
      // Do not choose current numer
      const didNotChoose = TABLE[i - 1][j];

      const reducedTarget = j - nums[i - 1];
      const choosed = reducedTarget >= 0 ? TABLE[i - 1][reducedTarget] : false;

      TABLE[i][j] = didNotChoose || choosed;
    }
  }

  return TABLE[len][target];
}
