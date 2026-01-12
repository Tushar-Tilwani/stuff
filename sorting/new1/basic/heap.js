function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

class Heap {
  constructor() {
    this.arr = [null];
  }

  insert(val) {
    const { arr } = this;
    arr.push(val);
    this._bubbleUp();
  }

  extractTop() {
    const { arr } = this;
    swap(arr, 1, arr.length - 1);
    const val = arr.pop();
    this._bubbleDown();
    return val;
  }

  peekTop() {
    return this.arr[1];
  }

  _bubbleUp() {
    const { arr } = this;
    let childIndex = arr.length - 1;

    while (childIndex > 1) {
      const parentIndex = Math.floor(childIndex / 2);
      if (arr[parentIndex] < arr[childIndex]) {
        break;
      }
      swap(arr, parentIndex, childIndex);
      childIndex = parentIndex;
    }
  }

  _bubbleDown() {
    const { arr } = this;
    const endIndex = arr.length - 1;

    let parentIndex = 1;
    while (parentIndex <= endIndex) {
      const childIndex1 = 2 * parentIndex;
      const childIndex2 = 2 * parentIndex + 1;
      const childIndex =
        arr[childIndex2] == undefined || arr[childIndex1] < arr[childIndex2] ? childIndex1 : childIndex2;
      // arr[childIndex] == undefined means parentIndex is leaf
      // arr[parentIndex] < arr[childIndex] mean parentIndex is at the right place
      if (arr[childIndex] == undefined || arr[parentIndex] < arr[childIndex]) {
        break;
      }
      swap(arr, parentIndex, childIndex);
      parentIndex = childIndex;
    }
  }
}

const heap = new Heap1();
heap.insert(3);
heap.insert(8);
heap.insert(5);
heap.insert(1);
heap.insert(4);

// console.log(heap.arr);

const arr = [];
while (heap.peekTop()) {
  arr.push(heap.extractTop());
}
console.log(arr, heap.arr);

//null, 1, 2 ,3

// 2, 4, 5

// 2n
//2n+1
