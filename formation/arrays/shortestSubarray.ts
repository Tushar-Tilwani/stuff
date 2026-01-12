class Heap1<T> {
  private data: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.compare = comparator;
  }

  private getParent(i: number): number {
    return Math.floor((i - 1) / 2);
  }
  private getLeft(i: number): number {
    return 2 * i + 1;
  }
  private getRight(i: number): number {
    return 2 * i + 2;
  }

  private swap(i: number, j: number): void {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  // Insert value
  push(val: T): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  // Remove and return top
  pop(): T | undefined {
    if (this.data.length === 0) return undefined;
    if (this.data.length === 1) return this.data.pop();

    const root = this.data[0];
    this.data[0] = this.data.pop()!;
    this.bubbleDown(0);
    return root;
  }

  // Peek top
  peek(): T | undefined {
    return this.data[0];
  }

  size(): number {
    return this.data.length;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const p = this.getParent(i);
      if (this.compare(this.data[i], this.data[p]) < 0) {
        this.swap(i, p);
        i = p;
      } else break;
    }
  }

  private bubbleDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let best = i;
      const l = this.getLeft(i);
      const r = this.getRight(i);

      if (l < n && this.compare(this.data[l], this.data[best]) < 0) best = l;
      if (r < n && this.compare(this.data[r], this.data[best]) < 0) best = r;

      if (best !== i) {
        this.swap(i, best);
        i = best;
      } else break;
    }
  }
}

// -------------------
// Example usage:



/* -----------------------------------------
   Usage:
   const minH = new Heap<number>((a,b) => a - b, [5,3,9,1]);
   minH.push(0);
   console.log(minH.peek()); // 0
   console.log(minH.pop());  // 0
------------------------------------------ */

function shortestSubarray(nums: number[], k: number): number {
  let result = Infinity;
  const heap = new Heap1((a: number[], b: number[]) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });
//   heap.push([10, 1]);
//   heap.push([5, 2]);
//   heap.push([5, 3]);
//   console.log(heap.pop(), heap.pop(), heap.pop());

  

  heap.push([0, -1]);
  
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    const [prefixSum, index] = heap.peek() ?? [];
    if ((sum - prefixSum) >= k) {
      result = Math.min(result, i - index);
      heap.pop();
    } else {
      heap.push([sum, i]);
    }
  }
  return isFinite(result) ? result : 0;
}
