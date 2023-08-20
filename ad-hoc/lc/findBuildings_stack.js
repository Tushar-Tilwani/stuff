/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function (heights) {
    const STACK = [];
    for (let i = 0; i < heights.length; i++) {
        // Pop elements if the currentVal is greater than lastValues. Maintaing a monotonic stack
        while (STACK.length > 0 && heights[STACK[STACK.length - 1]] > heights[i]) {
            STACK.pop();
        }
        STACK.push(i);

    }
    return STACK;

};