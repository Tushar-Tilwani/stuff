/**
 * https://leetcode.com/problems/rearrange-string-k-distance-apart/
 * @param {string} S
 * @return {string}
 */

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

function rearrangeString(str, k) {
  if (k <= 0) {
    return str;
  }
  const resultStr = [];
  const len = str.length;
  const maxAllowed = Math.ceil(len / k);
  let lastBucket = len % k;
  lastBucket = lastBucket === 0 ? k : lastBucket;
  const strArr = str.split("");
  const a = "a".charCodeAt(0);
  const freqMap = strArr.reduce((acc, char) => {
    const charCode = char.charCodeAt(0) - a;
    acc[charCode] = acc[charCode] + 1 || 1;
    return acc;
  }, {});
  const entries = Object.entries(freqMap);
  const heap = new Heap((a, b) => {
    if (a[1] === b[1]) {
      return a[0] < b[0];
    }
    return a[1] > b[1];
  });
  for (const entry of entries) {
    heap.add(entry);
  }

  while (true) {
    const toAddBackArr = [];

    for (let i = 0; i < k; i++) {
      const min = heap.extractMin();

      if (min === null) {
        return resultStr
          .map(charCode => String.fromCharCode(parseInt(charCode) + a))
          .join("");
      }

      const [char, frequency] = min;
      if (frequency === maxAllowed) {
        lastBucket--;
      }
      if (frequency > maxAllowed || lastBucket < 0) {
        return "";
      }
      resultStr.push(char);
      if (frequency - 1 > 0) {
        toAddBackArr.push([char, frequency - 1]);
      }
    }

    for (const toAddBack of toAddBackArr) {
      heap.add(toAddBack);
    }
  }
}

console.log(rearrangeString("abeabac", 3));
