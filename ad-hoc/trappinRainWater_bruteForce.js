// Solution: https://www.youtube.com/watch?v=HmBbcDiJapY&feature=emb_logo

/**
 * @param {number[]} heights
 * @return {number}
 */
var trap = function(heights) {
  let volume = 0;
  const len = heights.length;
  for (let i = 1; i < len - 1; i++) {
    let left = i - 1;
    let leftMax = -Infinity;
    while (left >= 0) {
      leftMax = Math.max(leftMax, heights[left]);
      left -= 1;
    }

    let right = i + 1;
    let rightMax = -Infinity;
    while (right < len) {
      rightMax = Math.max(rightMax, heights[right]);
      right += 1;
    }

    const minHeight = Math.min(leftMax, rightMax);
    if (minHeight > heights[i]) {
      // If it is the taller than left and right max then then zero water is collected
      volume += minHeight - heights[i];
    }
  }

  return volume;
};

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
