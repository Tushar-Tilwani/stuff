function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

class Heap {
  constructor(comparator) {
    this.arr = [null];
    this.comparator = comparator || ((a, b) => a < b);
  }

  add(val) {
    this.arr.push(val);
    this.bubbleUp();
    return this.arr[1];
  }

  bubbleUp() {
    let childIndex = this.arr.length - 1;
    let parentIndex;
    while (true) {
      parentIndex = Math.floor(childIndex / 2);
      if (
        parentIndex < 1 ||
        this.comparator(this.arr[parentIndex], this.arr[childIndex])
      ) {
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
        childIndex = this.comparator(
          this.arr[childIndex1],
          this.arr[childIndex2]
        )
          ? childIndex1
          : childIndex2;
      } else {
        // If parent has one children
        childIndex = childIndex1;
      }

      // Parent is in the right position
      if (this.comparator(this.arr[parentIndex], this.arr[childIndex])) {
        break;
      }

      // If parent is larger than child. Means we need to swap.
      swap(this.arr, parentIndex, childIndex);

      parentIndex = childIndex;
    }
  }

  extractTop() {
    if (this.arr.length === 1) {
      return null;
    }

    // Remove top element
    const top = this.arr[1];
    this.bubbleDown();
    return top;
  }

  peekTop() {
    if (this.arr.length === 1) {
      return null;
    }
    return this.arr[1];
  }
}

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function(buildings) {
  const cords = [];
  const heightMaxHeap = new Heap((a, b) => b < a);
  heightMaxHeap.add(0);

  for (const [x1, x2, y] of buildings) {
    cords.push([x1, y, "s"]);
    cords.push([x2, y, "e"]);
  }

  cords.sort(([x1, y1, pos1], [x2, y2, pos2]) => {
    if (x1 === x2) {
      if (pos1 === "s" && pos2 === "s") {
        return y2 - y1;
      }

      if (pos1 === "s" && pos2 === "e") {
        return -1;
      }

      if (pos1 === "e" && pos2 === "s") {
        return 1;
      }

      if (pos1 === "e" && pos2 === "e") {
        return y1 - y2;
      }
    }
    return x1 - x2;
  });
  //console.log(cords);

  const result = [];

  for (const [x, y, pos] of cords) {
    const prevMax = heightMaxHeap.peekTop();
    if (pos === "s") {
      heightMaxHeap.add(y);
    } else {
      const temp = [];

      while (y !== heightMaxHeap.peekTop()) {
        temp.push(heightMaxHeap.extractTop());
      }

      heightMaxHeap.extractTop();

      while (temp.length !== 0) {
        heightMaxHeap.add(temp.pop());
      }
    }
    const currentMax = heightMaxHeap.peekTop();

    if (currentMax !== prevMax) {
      result.push([x, currentMax]);
    }
  }
  return result;
};

const cords = [
  [2, 9, 10],
  [3, 7, 15],
  [5, 12, 12],
  [15, 20, 10],
  [19, 24, 8]
];

console.log(getSkyline(cords));
