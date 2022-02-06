/**
 * @param {string} s
 * @return {string[][]}
 */
function partition(s) {
  return helper(s, 0);
}

function helper(s, start) {
  const end = s.length - 1;
  if (end < start) {
    return [[]];
  }
  if (end === start) {
    return [[s[start]]];
  }

  const results = [];
  for (let i = start; i <= end; i++) {
    const prefix = s.slice(start, i + 1);
    const subStrs = helper(s, i + 1);
    const allSubStrs = subStrs.map((strArr) => [prefix, ...strArr]);
    results.push(...allSubStrs);
  }
  return results;
}

function isPalindrome(str) {
  const len = str.length - 1;
  const mid = Math.floor(len / 2);
  for (let i = 0; i <= mid; i++) {
    if (str[i] !== str[len - i]) {
      return false;
    }
  }

  return true;
}

console.log(partition("abba"));
