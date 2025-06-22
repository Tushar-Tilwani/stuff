function allSubsets(arr) {
  const result = [];
  _allSubsets(arr, result);
  return result;
}

function _allSubsets(arr, result) {
  if (arr.length < 1) {
    result.push([]);
    return;
  }
  const ele = arr.pop();
  _allSubsets(arr, result);
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

const subsets = allSubsets([1, 2, 3, 4]);
console.log(
  "Num",
  subsets.length,
  subsets.sort((a, b) => (a.length - b.length))
  // subsets
);
