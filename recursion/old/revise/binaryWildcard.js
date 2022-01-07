/*
 * Complete the find_all_possibilities function below.
 */
function find_all_possibilities(s) {
  const result = [];
  _find_all_possibilities([], s.split(""), 0, result);
  return result;
}

function _find_all_possibilities(path, S, index, result) {
  if (index === S.length) {
    result.push(path.join(""));
    return;
  }
  if (S[index] === "?") {
    path.push("0");
    _find_all_possibilities(path, S, index + 1, result);
    path.pop();

    path.push("1");
    _find_all_possibilities(path, S, index + 1, result);
    path.pop();
  } else {
    path.push(S[index]);
    _find_all_possibilities(path, S, index + 1, result);
    path.pop();
  }
}

console.log(find_all_possibilities("1?10"));
