function trap(height: number[]): number {
  const leftMax: number[] = [];
  let max = -Infinity;
  for (let i = 0; i < height.length; i++) {
    max = Math.max(max, height[i]);
    leftMax[i] = max;
  }

  const rightMax: number[] = [];
  max = -Infinity;
  for (let i = height.length - 1; i >= 0; i--) {
    max = Math.max(max, height[i]);
    rightMax[i] = max;
  }

  let result = 0;
  for (let i = 0; i < height.length; i++) {
    result += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  //   console.log(leftMax, rightMax);

  return result;
}
