/*
 * Complete the 'nearest_neighbours' function below.
 *
 * The function accepts integer p_x, p_y, k and a 2D integer array n_points as parameter.
 */

function nearest_neighbours(p_x, p_y, k, n_points) {
  // Write your code here
  return qSelect(n_points, 0, n_points.length - 1, k - 1, [p_x, p_y]);
}

function qSelect(arr, start, end, index, origin) {
  const pivotIndex = getRand(start, end);
  const pivotValueDistance = getDistance(origin, arr[pivotIndex]);
  swap(arr, pivotIndex, start);
  let orange = start;
  let blue = start;
  for (let green = start + 1; green <= end; green++) {
    if (getDistance(origin, arr[green]) === pivotValueDistance) {
      blue++;
      swap(arr, blue, green);
    } else if (getDistance(origin, arr[green]) < pivotValueDistance) {
      blue++;
      swap(arr, blue, green);
      orange++;
      swap(arr, orange, blue);
    }
  }
  swap(arr, start, orange);
  if (orange <= index && index <= blue) {
    return arr.slice(0, index + 1);
  } else if (orange < index) {
    return qSelect(arr, orange + 1, end, index, origin);
  } else {
    return qSelect(arr, start, orange - 1, index, origin);
  }
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function getDistance([x1, y1], [x2, y2]) {
  return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}

//
const nPoints = [
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [0, 1]
];
console.log(nearest_neighbours(0, 0, 2, nPoints));
