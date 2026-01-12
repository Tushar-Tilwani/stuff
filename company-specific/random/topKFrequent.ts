// A generic binary heap with a custom comparator.
// The comparator should return < 0 if a has higher priority than b.
class CustomHeap<T> {
  private data: T[] = [];
  private cmp: (a: T, b: T) => number;

  constructor(cmp: (a: T, b: T) => number, items?: Iterable<T>) {
    this.cmp = cmp;
    if (items) {
      this.data = Array.from(items);
      this.heapify();
    }
  }

  /** Number of items in the heap */
  size(): number {
    return this.data.length;
  }

  /** true if heap has no items */
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  /** Peek at the top (highest priority) element without removing it */
  peek(): T | undefined {
    return this.data[0];
  }

  /** Push a new item; O(log n) */
  push(item: T): void {
    this.data.push(item);
    this.siftUp(this.data.length - 1);
  }

  /**
   * Pop the top (highest priority) item; O(log n)
   * Returns undefined if the heap is empty.
   */
  pop(): T | undefined {
    const n = this.data.length;
    if (n === 0) return undefined;
    this.swap(0, n - 1);
    const out = this.data.pop() as T;
    if (this.data.length > 0) this.siftDown(0);
    return out;
  }

  /**
   * Replace the top element with `item` and re-heapify; O(log n)
   * Slightly faster than pop() then push() when you know the heap is non-empty.
   * If heap is empty, it just pushes.
   */
  replace(item: T): T | undefined {
    if (this.data.length === 0) {
      this.data.push(item);
      return undefined;
    }
    const out = this.data[0];
    this.data[0] = item;
    this.siftDown(0);
    return out;
  }

  /** Remove all items */
  clear(): void {
    this.data.length = 0;
  }

  /** Returns a shallow copy array of heap contents (not sorted) */
  toArray(): T[] {
    return this.data.slice();
  }

  /** Build heap in O(n) from current data array */
  private heapify(): void {
    for (let i = Math.floor(this.data.length / 2) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  private siftUp(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(this.data[i], this.data[p]) < 0) {
        this.swap(i, p);
        i = p;
      } else {
        break;
      }
    }
  }

  private siftDown(i: number): void {
    const n = this.data.length;
    while (true) {
      const l = (i << 1) + 1;
      const r = l + 1;
      let best = i;

      if (l < n && this.cmp(this.data[l], this.data[best]) < 0) best = l;
      if (r < n && this.cmp(this.data[r], this.data[best]) < 0) best = r;

      if (best !== i) {
        this.swap(i, best);
        i = best;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    const tmp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = tmp;
  }
}

const sortFn = (a: [string, number], b: [string, number]) => {
  if (a[1] === b[1]) {
    return b[0].localeCompare(a[0]);
  }
  return a[1] - b[1];
};

function topKFrequent(words: string[], k: number): string[] {
  const freqMap = words.reduce((acc, word) => {
    acc.set(word, (acc.get(word) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());
  const heap = new CustomHeap<[string, number]>(sortFn);
  for (const entry of freqMap.entries()) {
    heap.push(entry);
    if (heap.size() === k + 1) {
      heap.pop();
    }
  }
  return heap
    .toArray()
    .sort((...args) => -1 * sortFn(...args))
    .map(([word]) => word);
}
