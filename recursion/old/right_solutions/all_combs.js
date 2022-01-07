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
  }

  
  for (let i = start; i <= n; i++) {
    slate.push(i);
    combineHelper(n, i + 1, slate, k, result);
    slate.pop();
  }
  
}

console.log(combine(4,2));
