/*
 * Complete the mergeArrays function below.
 */
function mergeArrays(arr) {
  const isAcs = isAscending(arr);
  const result = [];
  const heap = new MinHeap();
  for (const values of arr) {
    for (const value of values) {
      heap.add(value);
    }
  }

  let val;
  while ((val = heap.extractMin()) !== null) {
    result.push(val);
  }
  return isAcs ? result : result.reverse();
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

class MinHeap {
  constructor() {
    this.arr = [null];
  }

  add(val) {
    this.arr.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let childIndex = this.arr.length - 1;
    let parentIndex;
    while (true) {
      parentIndex = Math.floor(childIndex / 2);
      if (parentIndex < 1 || this.arr[parentIndex] < this.arr[childIndex]) {
        break;
      }

      swap(this.arr, childIndex, parentIndex);
      childIndex = parentIndex;
    }
  }

  bubbleDown() {
    swap(this.arr, 1, this.arr.length - 1);
    this.arr.pop();
    const len = this.arr.length;
    let parentIndex = 1;
    let childIndex1, childIndex2;

    while (true) {
      childIndex1 = 2 * parentIndex;
      childIndex2 = 2 * parentIndex + 1;

      if (childIndex1 < len && childIndex2 < len) {
        // If parent has both children
        let childIndex =
          this.arr[childIndex1] < this.arr[childIndex2]
            ? childIndex1
            : childIndex2;

        // Parent is in the right position
        if (this.arr[parentIndex] < this.arr[childIndex]) {
          break;
        }

        // If parent is larger than child. Means we need to swap.
        swap(this.arr, parentIndex, childIndex);

        parentIndex = childIndex;
      } else if (childIndex1 < len) {
        // This means parent has only one child
        let childIndex = childIndex1;

        // Parent is in the right position
        if (this.arr[parentIndex] < this.arr[childIndex]) {
          break;
        }

        // If parent is larger than child. Means we need to swap.
        swap(this.arr, parentIndex, childIndex);

        parentIndex = childIndex;
      } else {
        // If parent does not have any child
        break;
      }
    }
  }

  extractMin() {
    if (this.arr.length === 1) {
      return null;
    }
    const min = this.arr[1];
    this.bubbleDown();
    return min;
  }
}

function isAscending(arr) {
  for (const singleArr of arr) {
    if (singleArr.length < 2) {
      continue;
    }
    for (let j = 0; j < singleArr.length - 1; j++) {
      if (singleArr[j] === singleArr[j + 1]) {
        continue;
      }
      return singleArr[j] < singleArr[j + 1];
    }
  }
  return true;
}

// console.log(
//   mergeArrays([
//     [1, 4, 7, 9],
//     [2, 3, 5, 8],
//     [0, 6, 10]
//   ])
// );

// console.log(
//   mergeArrays([
//     [10, 8, 4, 1],
//     [11, 3, 2, 0],
//     [7, 6, 5, 4]
//   ])
// );

console.log(
  mergeArrays([
    [9, 9, 9, 9],
    [9, 9, 9, 9],
    [9, 9, 9, 9],
    [9, 9, 9, 10],
    [9, 9, 9, 9],
    [9, 9, 9, 9]
  ])
);
