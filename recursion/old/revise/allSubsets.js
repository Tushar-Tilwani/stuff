function allSubsets(n) {
  const result = [];
  const values = new Array(n).fill(0).map((v, i) => i + 1);
  _allSubsets(values, 0, [], result);
  return result;
}

function _allSubsets(values, index, path, result) {
  if (index === values.length) {
    result.push(path.slice(0));
    return;
  }

  //  chosen
  path.push(values[index]);
  _allSubsets(values, index + 1, path, result);
  path.pop();

  // Not chosen
  _allSubsets(values, index + 1, path, result);
}

console.log(allSubsets(3));
