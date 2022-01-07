/*
 * Complete the function below.
 */
function sortedTwoSum(arr, sum) {
  let sortedArr = arr.sort((a, b) => a - b);
  let start = 0;
  let end = sortedArr.length - 1;
  const result = new Set();
  // console.log(sortedArr);

  while (start < end) {
    if (sortedArr[start] + sortedArr[end] === sum) {
      result.add(`${sortedArr[start]},${sortedArr[end]}`);
      start++;
      end--;
    } else if (sortedArr[start] + sortedArr[end] < sum) {
      start++;
    } else {
      end--;
    }
  }

  return Array.from(result.values());
}

const g = [5, -2, 2, 0, -1, 1];
const test2 = [1, 1, 1, 1, 0, 0, 3, -3, 3, 3, -3, -2, 2, 2, -2, 2, -5];

console.log(sortedTwoSum(test2, 0));
