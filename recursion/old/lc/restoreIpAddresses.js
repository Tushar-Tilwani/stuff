/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  const result = [];
  helper(s, 0, [], result);
  return result;
};

function helper(s, index, path, result) {
  if (path.length > 4) {
    return;
  }
  if (index === s.length && path.length === 4) {
    result.push(path.slice(0));
    return;
  }

  for (let i = index + 1; i < s.length; i++) {
    const temp = s.slice(index, i);
    if (parseInt(temp) > 255) {
      return;
    }
    path.push(s.slice(index, i));
    helper(s, index, path, result);
    path.pop();
  }
}
