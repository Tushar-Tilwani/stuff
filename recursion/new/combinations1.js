function allCombinations(n, k) {
  const result = [];
  helper(n, 1, [], k, result);
  return result;
}

function helper(max, start, path, k, result) {
  if (path.length === k) {
    result.push(path.slice(0));
    return;
  }

  for (let i = start; i <= max; i++) {
    path.push(i);
    helper(max, i + 1, path, k, result);
    path.pop();
  }
}

console.log(allCombinations(1, 1));
