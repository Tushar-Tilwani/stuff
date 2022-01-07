/**
 * @param {string} s
 * @return {number}
 */
const MEMO = {};
var numDecodings = function(s) {
  const result = [0];
  perms(s.split(""), 0, [], result);
  return MEMO["0,1"];
};

function perms(strArr, index, path, result) {
  if (path.length > 0) {
    const lastValue = path[path.length - 1];
    if (parseInt(lastValue) > 26 || lastValue.startsWith("0")) {
      return result[0];
    }
  }

  if (index === strArr.length) {
    // console.log(path);
    result[0] += 1;
    return result[0];
  }

  let val = 0;
  for (let i = index; i < strArr.length; i++) {
    path.push(strArr.slice(index, i + 1).join(""));
    let key = `${index},${i + 1}`;
    if (!Number.isFinite(MEMO[key])) {
      MEMO[key] = perms(strArr, i + 1, path, result);
    }
    val += MEMO[key];
    path.pop();
  }
  return val;
}

console.log(numDecodings("226"));

