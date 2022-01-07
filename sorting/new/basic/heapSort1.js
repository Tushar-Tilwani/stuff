// Children of n => 2n , 2n+1
// parent of n => Math.floor(n/2);

class Heap {
  constructor(arr) {
    this.arr = [null];
  }
  push(val) {
    this.arr.push(val);
    this._bubbleUp(this.arr);
    return val;
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
      if (arr[childIndex] > arr[parentIndex]) {
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
      if (childIndex1 > endIndex) {
        // Leaf node
        return;
      } else if (childIndex2 > endIndex) {
        // Only left node is there
        if (arr[parentIndex] < arr[childIndex1]) {
          swap(arr, parentIndex, childIndex1);
          parentIndex = childIndex1;
        } else {
          return;
        }
      } else {
        // Both right and left node are there
        let childIndex =
          arr[childIndex2] < arr[childIndex1] ? childIndex1 : childIndex2;

        if (arr[parentIndex] < arr[childIndex]) {
          swap(arr, parentIndex, childIndex);
          parentIndex = childIndex;
        } else {
          return;
        }
      }
    }
  }
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const heap = new Heap();
const n = 6;
for (let i = 0; i < n; i++) {
  heap.push(randomInRange(1, 700));
}
console.log(heap);
let sorted = [];
for (let i = 0; i < n; i++) {
  sorted.push(heap.extractTop());
}
console.log(sorted);
