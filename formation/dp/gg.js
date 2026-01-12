// Given weights and values of of items, put these items in a solution of capacity c to get the maximum total.

// You are given two array of integers values and weights which represent values and weights of given items respectively and c which represents solution capacity.
// Compute the maximum value subset of values such that sum of the weights of this subset does not exceed c.
// You cannot include a fraction of an item nor include the same item multiple times.
// Example:

// Given: values = [6, 9, 13], weights = [1, 2, 3], c = 5
// // returns 22
// Note: 9 + 13 (weight: 2 + 3 <= 5)
// [execution time limit] 4 seconds (js)

// [memory limit] 1 GB

// [input] integer c

// capacity

// [input] array.integer values

// [input] array.integer weights

// [output] integer

// [JavaScript] Syntax Tips

// // Prints help message to the console
// // Returns a string
// function helloWorld(name) {
//     console.log("This prints to the console when you Run Tests");
//     return "Hello, " + name;
// }

class JSHeap {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.compare = comparator; // if compare(a,b) < 0 → a is "higher priority"
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Insert new value
  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  // Remove top value
  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  // Peek top value
  peek() {
    return this.size() > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp() {
    let i = this.size() - 1;
    while (i > 0 && this.compare(this.heap[i], this.heap[this.getParentIndex(i)]) < 0) {
      this.swap(i, this.getParentIndex(i));
      i = this.getParentIndex(i);
    }
  }

  heapifyDown(i) {
    let smallest = i;
    const left = this.getLeftChildIndex(i);
    const right = this.getRightChildIndex(i);

    if (left < this.size() && this.compare(this.heap[left], this.heap[smallest]) < 0) {
      smallest = left;
    }
    if (right < this.size() && this.compare(this.heap[right], this.heap[smallest]) < 0) {
      smallest = right;
    }
    if (smallest !== i) {
      this.swap(i, smallest);
      this.heapifyDown(smallest);
    }
  }
}

function eatenApples(apples, days) {
  let result = 0;
  const heap = new JSHeap((a, b) => a[0] - b[0]);
  let i = 0;
  for (i = 0; i < apples.length; i++) {
    if (apples[i] > 0) {
      heap.push([days[i] + i, apples[i]]);
    }

    // remove expired
    while (heap.peek() && i === heap.peek()[0]) {
      heap.pop();
    }

    if (heap.size() > 0) {
      const [expire, count] = heap.pop();
      result += 1;
      count > 1 && heap.push([expire, count - 1]);
    }
  }

  while (heap.size() > 0) {
    const [expire, count] = heap.pop();
    if (expire === i) {
      continue;
    }
    result += 1;
    count > 1 && heap.push([expire, count - 1]);
    i++;
  }

  return result;
}
