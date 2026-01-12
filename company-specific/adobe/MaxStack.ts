// ---------- Doubly Linked List Node ----------
class Node {
  val: number;
  id: number;           // insertion order (monotonic); used as tie-breaker for equal values
  prev: Node | null = null;
  next: Node | null = null;
  constructor(val: number, id: number) {
    this.val = val;
    this.id = id;
  }
}

// ---------- Heap with index map for O(log n) arbitrary removal ----------
type HeapKey = number;

class TSHeap<T> {
  private data: T[] = [];
  private cmp: (a: T, b: T) => number;
  private keyFn: (item: T) => HeapKey;
  private idx: Map<HeapKey, number> = new Map();

  constructor(cmp: (a: T, b: T) => number, keyFn: (item: T) => HeapKey) {
    this.cmp = cmp;
    this.keyFn = keyFn;
  }

  size(): number { return this.data.length; }
  isEmpty(): boolean { return this.data.length === 0; }
  peek(): T | undefined { return this.data[0]; }

  push(item: T): void {
    const i = this.data.length;
    this.data.push(item);
    this.idx.set(this.keyFn(item), i);
    this.siftUp(i);
  }

  pop(): T | undefined {
    const n = this.data.length;
    if (n === 0) return undefined;
    this.swap(0, n - 1);
    const out = this.data.pop() as T;
    this.idx.delete(this.keyFn(out));
    if (this.data.length) this.siftDown(0);
    return out;
  }

  removeByKey(key: HeapKey): boolean {
    const i = this.idx.get(key);
    if (i === undefined) return false;
    const last = this.data.length - 1;
    if (i === last) {
      const out = this.data.pop()!;
      this.idx.delete(this.keyFn(out));
      return true;
    }
    this.swap(i, last);
    const out = this.data.pop()!;
    this.idx.delete(this.keyFn(out));
    this.bubble(i);
    return true;
  }

  private bubble(i: number): void {
    // choose direction based on relation with parent
    if (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(this.data[i], this.data[p]) < 0) { // "should be above"
        this.siftUp(i);
        return;
      }
    }
    this.siftDown(i);
  }

  private siftUp(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(this.data[i], this.data[p]) < 0) {
        this.swap(i, p);
        i = p;
      } else break;
    }
  }

  private siftDown(i: number): void {
    const n = this.data.length;
    while (true) {
      const l = (i << 1) + 1, r = l + 1;
      let best = i;
      if (l < n && this.cmp(this.data[l], this.data[best]) < 0) best = l;
      if (r < n && this.cmp(this.data[r], this.data[best]) < 0) best = r;
      if (best !== i) {
        this.swap(i, best);
        i = best;
      } else break;
    }
  }

  private swap(i: number, j: number): void {
    if (i === j) return;
    const a = this.data[i], b = this.data[j];
    this.data[i] = b; this.data[j] = a;
    this.idx.set(this.keyFn(b), i);
    this.idx.set(this.keyFn(a), j);
  }
}

// ---------- MaxStack ----------
export class MaxStack {
  private head: Node | null = null; // bottom (optional to track)
  private tail: Node | null = null; // top of stack (O(1) top/pop)
  private nextId = 1;

  // Heap items store the node reference and mirror its (val,id).
  // Comparator makes this a *max*-heap by ordering "highest priority" first:
  //  - larger value first
  //  - for equal value, larger id (more recent) first
  private heap = new TSHeap<{ val: number; id: number; node: Node }>(
    (a, b) => (b.val - a.val) || (b.id - a.id),
    (item) => item.id
  );

  // --- core stack ops ---
  push(x: number): void {
    const node = new Node(x, this.nextId++);
    // append to DLL tail
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    // mirror in heap
    this.heap.push({ val: node.val, id: node.id, node });
  }

  pop(): number {
    if (!this.tail) throw new Error("Stack is empty");
    const node = this.tail;
    // unlink from DLL (O(1))
    this.unlink(node);
    // remove from heap by id (O(log n))
    this.heap.removeByKey(node.id);
    return node.val;
    // overall O(log n)
  }

  top(): number {
    if (!this.tail) throw new Error("Stack is empty");
    return this.tail.val; // O(1)
  }

  peekMax(): number {
    const item = this.heap.peek();
    if (!item) throw new Error("Stack is empty");
    return item.val; // O(1)
  }

  popMax(): number {
    const item = this.heap.pop();
    if (!item) throw new Error("Stack is empty");
    // remove that exact node from the DLL in O(1)
    this.unlink(item.node);
    return item.val; // O(log n) from heap.pop
  }

  // --- helpers ---
  private unlink(node: Node): void {
    const { prev, next } = node;
    if (prev) prev.next = next; else this.head = next;
    if (next) next.prev = prev; else this.tail = prev;
    node.prev = node.next = null;
  }
}
