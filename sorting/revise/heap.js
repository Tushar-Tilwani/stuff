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

    while (true) {
      const childIndex1 = 2 * parentIndex;
      const childIndex2 = 2 * parentIndex + 1;
      let childIndex;
      if (childIndex1 >= len) {
        // If parent does not have any child
        break;
      }
      if (childIndex2 < len) {
        // If parent has both children
        childIndex =
          this.arr[childIndex1] < this.arr[childIndex2]
            ? childIndex1
            : childIndex2;
      } else {
        // If parent has one children
        childIndex = childIndex1;
      }

      // Parent is in the right position
      if (this.arr[parentIndex] < this.arr[childIndex]) {
        break;
      }

      // If parent is larger than child. Means we need to swap.
      swap(this.arr, parentIndex, childIndex);

      parentIndex = childIndex;
    }
  }

  extractMin() {
    if (this.arr.length === 1) {
      return null;
    }

    // Remove top element
    const min = this.arr[1];

    this.bubbleDown();

    return min;
  }
}

const minHeap = new MinHeap();
minHeap.add(6);
minHeap.add(3);
minHeap.add(1);
minHeap.add(5);
minHeap.add(0);
minHeap.add(-2);
minHeap.add(-1);

// minHeap.add(-2);

// console.log(minHeap);
// console.log(minHeap.extractMin());
// console.log(minHeap);
// console.log(minHeap.extractMin());
// console.log(minHeap);

let val;
// console.log(minHeap);
while ((val = minHeap.extractMin()) !== null) {
  // console.log(minHeap);
  console.log(val);
}
