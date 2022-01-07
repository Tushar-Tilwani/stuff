/*
 * Complete the function below.
 * The function accepts an INTEGER and two INTEGER_ARRAYS as parameters and
 * is expected to return an INTEGER_ARRAY.
 */

function kth_largest(k, initial_stream, append_stream) {
  const minHeap = new Heap([], (a, b) => a > b);
  for (const val of initial_stream) {
    if (minHeap.size() < k) {
      minHeap.push(val);
    } else {
      if (val > minHeap.peekTop()) {
        minHeap.extractTop();
        minHeap.push(val);
      }
    }
  }

  const result = [];
  for (const val of append_stream) {
    if (minHeap.size() < k) {
      minHeap.push(val);
    } else {
      if (val > minHeap.peekTop()) {
        minHeap.extractTop();
        minHeap.push(val);
      }
    }
    result.push(minHeap.peekTop());
  }
  return result;
}

// Children of n => 2n , 2n+1
// parent of n => Math.floor(n/2);
// Children of n => 2n , 2n+1
// parent of n => Math.floor(n/2);

class Heap {
  constructor(arr, compartor) {
    this.arr = [null];
    this.compartor = compartor;
    for (const val of arr) {
      this.push(val);
    }
  }
  push(val) {
    this.arr.push(val);
    this._bubbleUp(this.arr);
    return val;
  }
  peekTop() {
    return this.arr[1];
  }
  extractTop() {
    const len = this.arr.length - 1;
    if (len < 1) {
      return;
    }

    swap(this.arr, 1, len);

    const top = this.arr.pop();
    this._bubbleDown(this.arr);

    return top;
  }
  _bubbleUp(arr) {
    let childIndex = arr.length - 1;

    while (childIndex > 1) {
      let parentIndex = Math.floor(childIndex / 2);
      if (this.compartor(arr[parentIndex], arr[childIndex])) {
        swap(arr, childIndex, parentIndex);
        childIndex = parentIndex;
      } else {
        break;
      }
    }
  }
  _bubbleDown(arr) {
    let parentIndex = 1;
    let endIndex = arr.length - 1;
    while (parentIndex <= endIndex) {
      let childIndex1 = 2 * parentIndex;
      let childIndex2 = 2 * parentIndex + 1;
      if (arr[childIndex1] === undefined && arr[childIndex2] === undefined) {
        // Leaf node
        return;
      } else if (arr[childIndex2] === undefined) {
        // Only left node is there
        if (this.compartor(arr[parentIndex], arr[childIndex1])) {
          swap(arr, parentIndex, childIndex1);
          parentIndex = childIndex1;
        } else {
          return;
        }
      } else {
        // Both right and left node are there
        let childIndex = this.compartor(arr[childIndex2], arr[childIndex1])
          ? childIndex1
          : childIndex2;

        if (this.compartor(arr[parentIndex], arr[childIndex])) {
          swap(arr, parentIndex, childIndex);
          parentIndex = childIndex;
        } else {
          return;
        }
      }
    }
  }
  size() {
    return this.arr.length - 1;
  }
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

console.log(kth_largest(3, [4, 5, 6, 7], [5, 6, 4]));
