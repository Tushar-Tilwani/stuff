// A generic binary heap with a custom comparator.
// comparator(a, b) < 0  => a has higher priority than b
class CustomHeap<T> {
  private data: T[];
  private cmp: (a: T, b: T) => number;

  constructor(
    cmp: (a: T, b: T) => number,
    items: Iterable<T> = []
  ) {
    this.cmp = cmp;
    this.data = Array.from(items);
    this.buildHeap(); // O(n)
  }

  /** Number of elements */
  size(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  /** O(log n) */
  push(value: T): void {
    this.data.push(value);
    this.siftUp(this.data.length - 1);
  }

  /** O(log n) */
  pop(): T | undefined {
    if (this.data.length === 0) return undefined;

    this.swap(0, this.data.length - 1);
    const result = this.data.pop()!;
    if (this.data.length > 0) {
      this.siftDown(0);
    }
    return result;
  }

  /** O(log n) */
  replace(value: T): T | undefined {
    if (this.data.length === 0) {
      this.data.push(value);
      return undefined;
    }
    const out = this.data[0];
    this.data[0] = value;
    this.siftDown(0);
    return out;
  }

  clear(): void {
    this.data.length = 0;
  }

  toArray(): T[] {
    return [...this.data];
  }

  // ---------- INTERNALS ----------

  /** O(n) heap construction */
  private buildHeap(): void {
    // Last non-leaf node
    for (let i = (this.data.length >> 1) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  private siftUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.cmp(this.data[index], this.data[parent]) < 0) {
        this.swap(index, parent);
        index = parent;
      } else {
        break;
      }
    }
  }

  private siftDown(index: number): void {
    const n = this.data.length;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let best = index;

      if (left < n && this.cmp(this.data[left], this.data[best]) < 0) {
        best = left;
      }
      if (right < n && this.cmp(this.data[right], this.data[best]) < 0) {
        best = right;
      }

      if (best === index) break;
      this.swap(index, best);
      index = best;
    }
  }

  private swap(i: number, j: number): void {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}
