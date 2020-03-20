function allPerms(n) {
  const result = [];
  const values = new Array(n).fill(0).map((v, i) => i + 1);
  _allPerms(values, 0, [], result);
  return result;
}

function _allPerms(values, index, path, result) {
  if (values.length === path.length) {
    result.push(path.slice(0));
    return;
  }
  for (let i = index; i < values.length; i++) {
    path.push(values[i]);
    swap(values, i, index);
    _allPerms(values, index + 1, path, result);
    swap(values, i, index);
    path.pop();
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(allPerms(3));
