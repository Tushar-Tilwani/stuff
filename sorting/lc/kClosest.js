// https://leetcode.com/problems/k-closest-points-to-origin/
/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function(points, K) {
  qSelect(points, K);
  return points.slice(0, K);
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function getDistance([x, y]) {
  return Math.pow(x, 2) + Math.pow(y, 2);
}

function qSelect(arr, K, start = 0, end = arr.length - 1) {
  if (end <= start) {
    return arr.slice(0, K);
  }
  const pivotIndex = start;
  const pivot = arr[pivotIndex];
  let lp = start;
  swap(arr, lp, pivotIndex);
  for (let rp = start + 1; rp < arr.length; rp++) {
    if (getDistance(arr[rp]) < getDistance(pivot)) {
      lp++;
      swap(arr, lp, rp);
    }
  }
  swap(arr, lp, pivotIndex);
  if (lp === K) {
    return arr.slice(0, K);
  } else if (lp < K) {
    return qSelect(arr, K, lp + 1, end);
  } else {
    return qSelect(arr, K, start, lp - 1);
  }
}

let points = [
    [3, 3],
    [5, -1],
    [-2, 4]
  ],
  K = 2;

console.log(kClosest(points, K));
//console.log(qSelect([4, 3, 2, 1, 5, 6], 6));
