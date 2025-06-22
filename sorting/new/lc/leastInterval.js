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
 * @param {character[]} tasks
 * @param {number} k
 * @return {number}
 */
var leastInterval = function (tasks, k) {
  const len = tasks.length;
  const freqMap = tasks.reduce((map, char) => {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
    return map;
  }, new Map());
  const entires = Array.from(freqMap.entries());
  const maxHeap = new Heap(entires, (a, b) => a[1] < b[1]);

  const result = [];
  let index = 0;

  while (maxHeap.size() > 0) {
    const topKValues = [];
    for (let i = 0; i <= k; i++) {
      topKValues.push(maxHeap.extractTop());
    }

    for (const val of topKValues) {
      const [task, freq] = val ?? [null, 0];
      result[index] = task;
      index += 1;
      if (freq > 1) {
        maxHeap.push([task, freq - 1]);
      }
    }
  }

  while (result[result.length - 1] === null) {
    // While the last element is a 0,
    result.pop(); // Remove that last element
  }

  return result;
};

let tasks = ["A", "A", "A", "B", "B", "B"],
  n = 2;

(tasks = ["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"]), (n = 2);

const result = leastInterval(tasks, n);

console.log(result, result.length);
