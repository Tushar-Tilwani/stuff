/**
 * @param {number[]} row
 * @return {number}
 */
const minSwapsCouples = function (row) {
  const result = [0];
  helper(row, 0, result);
  return result[0];
};

function helper(row, index, result) {
  if (index >= row.length) {
    return;
  }

  const firstPair = row[index];
  const foundIndex =
    firstPair % 2 === 0
      ? row.findIndex((val) => val === firstPair + 1)
      : row.findIndex((val) => val === firstPair - 1);

  if (foundIndex !== index + 1) {
    result[0] += 1;
    swap(row, index + 1, foundIndex);
  }
  helper(row, index + 2, result);
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
