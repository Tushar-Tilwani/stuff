/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function (heights) {
    const maxArr = [];
    let maxVal = -Infinity;
    for (let i = heights.length - 1; i >= 0; i--) {
        if (heights[i] > maxVal) {
            maxVal = heights[i];
        }
        maxArr[i] = maxVal;
    }
    const result = [];
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] >= maxArr[i]) {
            result.push(i);
        }
    }
    return result;
};