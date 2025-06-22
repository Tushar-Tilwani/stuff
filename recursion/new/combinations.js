function allCombinations(arr, k) {
  const result = [];
  helper(arr, 0, [], k, result);
  return result;
}

function helper(arr, start, path, k, result) {
  if (path.length === k) {
    result.push(path.slice(0));
    return;
  }

  for (let i = start; i < arr.length; i++) {
    path.push(arr[i]);
    helper(arr, i + 1, path, k, result);
    path.pop();
  }
}

console.log(allCombinations([1, 2, 3], 2));
