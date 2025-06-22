/**
 * @param {number[]} heights
 * @return {number}
 */
var trap = function(heights) {
  let volume = 0;
  const len = heights.length;

  const leftMaxs = [-Infinity];
  for (let i = 1; i < len; i++) {
    leftMaxs[i] = Math.max(leftMaxs[i - 1], heights[i - 1]);
  }

  const rightMaxs = [];
  rightMaxs[len - 1] = -Infinity;
  for (let i = len - 2; i >= 0; i--) {
    rightMaxs[i] = Math.max(rightMaxs[i + 1], heights[i + 1]);
  }

  for (let i = 1; i < len - 1; i++) {
    const minHeight = Math.min(leftMaxs[i], rightMaxs[i]);
    if (minHeight > heights[i]) {
      // If it is the taller than left and right max then then zero water is collected
      volume += minHeight - heights[i];
    }
  }

  return volume;
};

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
