/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  const result = [];
  combineHelper(n, 1, [], k, result);
  return result;
};

function combineHelper(n, start, slate, k, result) {
  if (slate.length === k) {
    result.push(slate.slice(0));
    return;
  } else if (start > n) {
    return;
  } else {
    combineHelper(n, start + 1, slate, k, result);
    
    slate.push(start);
    combineHelper(n, start + 1, slate, k, result);
    slate.pop();
  }
}

console.log(combine(4, 2));
