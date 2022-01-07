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
 * @param {string} s
 * @return {string}
 */
function reorganizeString(s) {
  const len = s.length;
  const freqMap = s.split("").reduce((map, char) => {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
    return map;
  }, new Map());
  const entires = Array.from(freqMap.entries());
  const maxHeap = new Heap(entires, (a, b) => a[1] < b[1]);
  /**
   * If largest frequyency item is more than half of length
   * return empty (Not possible)
   */
  if (maxHeap.peekTop()[1] > Math.ceil(len / 2)) {
    return "";
  }

  const result = [];
  let index = 0;

  while (index < len) {
    const [first, second] = [maxHeap.extractTop(), maxHeap.extractTop()];
    result[index++] = first[0];
    first[1] = first[1] - 1;
    if (first[1] > 0) {
      maxHeap.push(first);
    }

    // Incase first is last value;
    if (!second) {
      break;
    }

    result[index++] = second[0];
    second[1] = second[1] - 1;
    if (second[1] > 0) {
      maxHeap.push(second);
    }
  }

  return result;
}

console.log(reorganizeString("aabc"));
