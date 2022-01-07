// https://leetcode.com/problems/find-median-from-data-stream/

function MedianFinder() {
  this.maxHeap = new Heap([], (a, b) => a < b);
  this.minHeap = new Heap([], (a, b) => a > b);
}

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  const minHeap = this.minHeap;
  const maxHeap = this.maxHeap;
  minHeap.push(num);
  /* Doing this ensures minmum values in the minHeap gets transferred to max ensuring
  the larger half always stays in the minHeap. It's like minHeap spits out the weakest
  values. Stolen from EPI
  */
  maxHeap.push(minHeap.extractTop());
  if (maxHeap.size() > minHeap.size()) {
    /* Doing this ensures min always has the extra value incase of odd values
     */
    minHeap.push(maxHeap.extractTop());
  }
  return null;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const minHeap = this.minHeap;
  const maxHeap = this.maxHeap;
  return maxHeap.size() === minHeap.size()
    ? 0.5 * (minHeap.peekTop() + maxHeap.peekTop())
    : minHeap.peekTop();
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

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
