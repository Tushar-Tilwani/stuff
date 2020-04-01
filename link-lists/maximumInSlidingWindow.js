/*
 * Complete the function below.
 */
function max_in_sliding_window(arr, w) {
  const l = arr.length - w;
  const result = [];
  for (let i = 0; i <= l; i++) {
    result.push(Math.max(...arr.slice(i, i + w)));
  }
  return result;
}

function maxSlidingWindow(arr, w) {
  const l = arr.length - w;
  const result = [];
  for (let i = 0; i <= l; i++) {
    result.push(Math.max(...arr.slice(i, i + w)));
  }
  return result;
}

console.log(max_in_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3));
