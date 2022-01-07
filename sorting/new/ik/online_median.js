/*
 * Complete the function below.
 * The function accepts an INTEGER_ARRAY as parameter and expected to return an INTEGER_ARRAY.
 */
function online_median(stream) {
  const minHeap = new Heap([], (a, b) => a > b);
  const maxHeap = new Heap([], (a, b) => a < b);
  const result = [];

  for (const val of stream) {
    if (maxHeap.size() === 0) {
      // first item
      maxHeap.push(val);
      result.push(val);
      continue;
    }
    
    if (val > maxHeap.peekTop()) {
      minHeap.push(val);
      if (minHeap.size() > maxHeap.size()) {
        maxHeap.push(minHeap.extractTop());
      }
    } else {
      maxHeap.push(val);
      if (maxHeap.size() > minHeap.size()) {
        minHeap.push(maxHeap.extractTop());
      }
    }

    if (minHeap.size() == maxHeap.size()) {
      const median = Math.floor((minHeap.peekTop() + maxHeap.peekTop()) / 2);
      result.push(median);
    } else {
      const median =
        minHeap.size() > maxHeap.size() ? minHeap.peekTop() : maxHeap.peekTop();
      result.push(median);
    }
  }

  return result;
}

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

    this.swap(this.arr, 1, len);

    const top = this.arr.pop();
    this._bubbleDown(this.arr);

    return top;
  }
  _bubbleUp(arr) {
    let childIndex = arr.length - 1;

    while (childIndex > 1) {
      let parentIndex = Math.floor(childIndex / 2);
      if (this.compartor(arr[parentIndex], arr[childIndex])) {
        this.swap(arr, childIndex, parentIndex);
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
          this.swap(arr, parentIndex, childIndex1);
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
          this.swap(arr, parentIndex, childIndex);
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
  swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
}
