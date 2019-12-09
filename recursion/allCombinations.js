function allCombinations(arr, n) {
  const result = [];
  _allCombinations(arr, n, result);
  return result;
}

function _allCombinations(arr, n, result) {
  if (arr.length < 1) {
    result.push([]);
    return;
  }
  const ele = arr.pop();
  _allCombinations(arr, n, result);
  const len = result.length;
  for (let i = 0; i < len; i++) {
    let res = result[i];
    result.push([...res, ele]);
  }
}

// const result = [2];
// for (let res of result) {
//   console.log(res);
// }

const combinations = allCombinations([1, 2, 3, 4]);
console.log(
  "Num",
  combinations.length,
  combinations.sort((a, b) => a.length - b.length)
);
