/**
 * @param {number[]} heights
 * @return {number}
 */
const maxArea = function (heights) {
  const end = heights.length - 1;
  let left = 0;
  let right = end;
  let maxArea = -Infinity;
  while (left < right) {
    const minHeight = Math.min(heights[left], heights[right]);
    maxArea = Math.max(maxArea, minHeight * (right - left));
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea;
};
