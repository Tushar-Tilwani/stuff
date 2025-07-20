/**
 * @param {number[]} heights
 * @return {number[]}
 */
const findBuildings = function (heights) {
  const STACK = [];

  for (let i = 0; i < heights.length; i++) {
    while (STACK.length > 0 && STACK[STACK.length - 1][0] < heights[i]) {
      STACK.pop();
    }
    STACK.push([heights[i], i]);
  }

  return STACK.map(([, index]) => index);
};
