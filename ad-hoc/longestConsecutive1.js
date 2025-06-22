// https://leetcode.com/problems/longest-consecutive-sequence/

/**
 * You had to look up the solution for this one.
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
var longestConsecutive = function(nums) {
  const set = nums.reduce((map, num) => {
    map.add(num);
    return map;
  }, new Set());

  let maxConsecutive = 0;
  for (const num of nums) {
    if (set.has(num - 1)) {
      continue;
    }
    let currentNum = num + 1;
    let count = 1;

    while (set.has(currentNum)) {
      count += 1;
      currentNum += 1;
    }
    maxConsecutive = Math.max(maxConsecutive, count);
  }
  return maxConsecutive;
};

let arr = [1, 2, 0, 1];
arr = [100, 4, 200, 1, 3, 2];

// arr = [1, 0, -1];

console.log(longestConsecutive(arr));
