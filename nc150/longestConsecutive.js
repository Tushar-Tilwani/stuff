/**
 * You AGAIN AGAIN had to look up the solution for this one.
 * SOLUTION: Keep everything in a set.
 * Loop through the numbers.
 * Then within the loop try to loop num+1 ... num+n;
 * Find the max n. This is an O(n^2)
 * Now The optimization:
 * If a num-1 is in the set that means num
 * is not a minimum number in the sequence.
 * So we do not do the  num+1 num+2 to num+n loop
 * In this way we will loop over all the numbers only twice
 * Thus, now complexity will be: )(2N)
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
  const set = new Set(nums);
  let max = 0;
  for (const num of [...set]) {
    if (set.has(num - 1)) {
      continue;
    }
    let count = 0;
    while (set.has(num + count)) {
      count++;
      max = Math.max(max, count);
    }
  }

  return max;
};
