/**
 * @param {number} n
 * @return {number}
 */
function countArrangement(n) {
  const arr = new Array(n).fill(0).map((v, i) => i + 1);
  const result = [];
  helper(arr, 0, [], result);
  return result.length;
}

function helper(arr, index, slate, result) {
  if (index === arr.length) {
    result.push(slate.slice(0));
    return;
  }

  for (let i = index; i < arr.length; i++) {
    if (!isValid(slate, arr[i])) {
      continue;
    }
    swap(arr, index, i);
    slate.push(arr[index]);
    helper(arr, index + 1, slate, result);
    slate.pop();
    swap(arr, index, i);
  }
}

function isValid(slate, newValue) {
  const newIndex = slate.length + 1;
  return newValue % newIndex === 0 || newIndex % newValue === 0;
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

console.log(countArrangement(3));
