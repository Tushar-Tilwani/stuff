/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function (heights) {
    const result = [];
    helper(heights, 0, result);
    return result;
};

function helper(heights, index, result) {
    if (index === heights.length - 1) {
        result.push(index);
        return heights[index];
    }
    const maxVal = helper(heights, index + 1, result);
    if (heights[index] > maxVal) {
        result.push(index);
        return heights[index];
    }
    return maxVal;
}