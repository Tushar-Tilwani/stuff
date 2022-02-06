/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
function combine(n, k) {
  const result = [];
  helper(n, k, 0, [], result);
  return result;
}

function helper(n, k, index, slate, result) {
  if (slate.length === k) {
    result.push(slate.slice(0));
    return;
  }
  for (let i = index; i < n; i++) {
    slate.push(i + 1);
    helper(n, k, i + 1, slate, result);
    slate.pop();
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(combine(4, 2));
