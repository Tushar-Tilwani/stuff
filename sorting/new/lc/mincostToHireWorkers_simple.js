// Solution: https://www.youtube.com/watch?v=o8emK4ehhq0

const OFFSET = Math.pow(10, 5);

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

/**
 * @param {number[]} quality
 * @param {number[]} wage
 * @param {number} k
 * @return {number}
 */
function mincostToHireWorkers(quality, wage, k) {
  const len = quality.length;
  const workers = [];
  for (let i = 0; i < len; i++) {
    workers.push([wage[i] / quality[i], quality[i]]);
  }

  workers.sort(([ratio1, quality1], [ratio2, quality2]) =>
    ratio1 !== ratio2 ? ratio1 - ratio2 : quality1 - quality2
  );

  const qualityMaxHeap = new Heap([], (a, b) => a < b);
  let qualitySum = 0;
  let result = Infinity;

  for (let i = 0; i < len; i++) {
    const [captainRatio, quality] = workers[i];

    qualityMaxHeap.push(quality);
    qualitySum += quality;

    if (qualityMaxHeap.size() > k) {
      qualitySum -= qualityMaxHeap.extractTop();
    }

    if (qualityMaxHeap.size() === k) {
      result = Math.min(result, captainRatio * qualitySum);
    }
  }

  return Math.round(result * OFFSET) / OFFSET;
}

// let quality = [10, 20, 5],
//   wage = [70, 50, 30],
//   k = 2;

let quality = [3, 1, 10, 10, 1],
  wage = [4, 8, 2, 2, 7],
  k = 3;
console.log(mincostToHireWorkers(quality, wage, k));
