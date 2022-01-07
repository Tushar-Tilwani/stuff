/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function(points, K) {
  return qSelect(points, 0, points.length - 1, K - 1);
};

function qSelect(arr, start, end, index) {
  const pivotIndex = getRand(start, end);
  const pivotValueDistance = findDistance(arr[pivotIndex]);
  swap(arr, start, pivotIndex);
  let orange = start;
  for (let green = start + 1; green <= end; green++) {
    if (findDistance(arr[green]) < pivotValueDistance) {
      orange++;
      swap(arr, orange, green);
    }
  }

  swap(arr, start, orange);

  if (orange === index) {
    return arr.slice(0, index + 1);
  } else if (index < orange) {
    return qSelect(arr, start, orange - 1, index);
  } else {
    return qSelect(arr, orange + 1, end, index);
  }
}

function findDistance([x, y]) {
  return Math.pow(x, 2) + Math.pow(y, 2);
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(
  kClosest(
    [
      [1, 3],
      [-2, 2],
      [4, 5],
      [0, 1]
    ],
    2
  )
);
