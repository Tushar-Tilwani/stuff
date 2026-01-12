/**
 * @param {number[]} arr
 * @return {number[]}
 */
var pancakeSort = function (arr) {
  const result = [];
  let endIndex = arr.length - 1;
  while (endIndex > 0) {
    const maxValue = endIndex + 1;
    const maxValueIndex = arr.findIndex((val) => val === maxValue);
    if (maxValueIndex === 0) {
      // flip at end
      arr = flip(arr, endIndex);
      result.push(endIndex);
    } else {
      arr = flip(arr, maxValueIndex);
      result.push(maxValueIndex);
    }

    if (arr[endIndex] - 1 === endIndex) {
      endIndex -= 1;
    }
  }
  return result;
};

function flip(arr, index) {
  const noReverse = arr.slice(index + 1, arr.length);
  const reverse = arr.slice(0, index).reverse();
  return [...reverse, ...noReverse];
}
