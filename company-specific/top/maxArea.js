/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let start = 0;
  let end = height.length - 1;
  let maxArea = -Infinity;

  while (start < end) {
    maxArea = Math.max(
      maxArea,
      Math.abs(Math.min(height[start], height[end]) * (end - start))
    );
    if (height[start] > height[end]) {
      end--;
    } else {
      start++;
    }
  }

  return maxArea;
};
