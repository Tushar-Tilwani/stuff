/**
 * @param {int32} p_x
 * @param {int32} p_y
 * @param {int32} k
 * @param {list_list_int32} n_points
 * @return {list_list_int32}
 */
function nearest_neighbours(p_x, p_y, k, n_points) {
  const distances = n_points.map(([nX, nY]) => [
    Math.pow(p_x - nX, 2) + Math.pow(p_y - nY, 2),
    [nX, nY],
  ]);
  //  console.log(distances);
  // Write your code here.
  //   const f = qSelect(distances, 0, distances.length - 1, k - 1);

  return qSelect(distances, 0, distances.length - 1, k - 1).map((u) => u[1]);
}

function qSelect(distances, start, end, k) {
  const pivotIndex = randomInRange(start, end);
  const [pivotDistance] = distances[pivotIndex];
  swap(distances, start, pivotIndex);

  let startPointer = start;
  let middlePointer = start + 1;
  let endPointer = end;

  while (middlePointer <= endPointer) {
    const [currentDistance] = distances[middlePointer];

    if (currentDistance < pivotDistance) {
      startPointer++;
      swap(distances, startPointer, middlePointer);
      middlePointer++;
    } else if (currentDistance > pivotDistance) {
      swap(distances, endPointer, middlePointer);
      endPointer--;
    } else {
      middlePointer++;
    }
  }

  swap(distances, start, startPointer);
  if (k >= startPointer && k < middlePointer) {
    return distances.slice(0, k + 1);
  } else if (k < startPointer) {
    return qSelect(distances, start, startPointer - 1, k);
  } else {
    return qSelect(distances, endPointer + 1, end, k);
  }
}

function swap(distances, i, j) {
  const temp = distances[i];
  distances[i] = distances[j];
  distances[j] = temp;
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
