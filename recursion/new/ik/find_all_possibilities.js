/**
 * @param {str} s
 * @return {list_str}
 */
function find_all_possibilities(s) {
  // Write your code here.
  const result = [];
  helper(s, 0, [], result);
  return result;
}

function helper(s, index, path, result) {
  if (s.length === index) {
    result.push(path.slice(0));
    return;
  }
  if (s[index] === "?") {
    path.push(0);
    helper(s, index + 1, path, result);
    path.pop();

    path.push(1);
    helper(s, index + 1, path, result);
    path.pop();
  } else {
    path.push(s[index]);
    helper(s, index + 1, path, result);
    path.pop();
  }
}
