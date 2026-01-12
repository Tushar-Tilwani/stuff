class DLNode {
  public val: number | null;
  public next?: DLNode;
  public prev?: DLNode;
  constructor(val: number | null, next?: DLNode, prev?: DLNode) {
    this.val = val;
    this.next = next ?? null;
    this.prev = prev ?? null;
  }
}

class FirstUnique {
  head: DLNode;
  tail: DLNode;
  dlMap: Map<number, DLNode>;
  valueSet: Set<number>;
  constructor(nums: number[]) {
    this.head = new DLNode(null);
    this.dlMap = new Map();
    this.valueSet = new Set();
    this.tail = this.head;
    for (const num of nums) {
      this.add(num);
    }
  }

  showFirstUnique(): number {
    return this.head?.next?.val ?? -1;
  }

  deleteSelf(num: number) {
    const node = this.dlMap.get(num);
    if (!node) {
      return;
    }
    this.dlMap.delete(num);
    const prev = node.prev;
    const next = node.next;

    const newTail = this.tail === node ? this.tail.prev : this.tail;

    if (prev) prev.next = next;
    if (next) next.prev = prev;

    this.tail = newTail ?? this.head;
  }

  add(num: number): void {
    if (this.valueSet.has(num)) {
      this.deleteSelf(num);
      return;
    }
    this.valueSet.add(num);
    const next = new DLNode(num);
    this.tail.next = next;
    next.prev = this.tail;
    this.tail = next;
    this.dlMap.set(num, this.tail);

    // num === 17 && console.log(this.head);
  }
}

/**
 * Your FirstUnique object will be instantiated and called as such:
 * var obj = new FirstUnique(nums)
 * var param_1 = obj.showFirstUnique()
 * obj.add(value)
 */
