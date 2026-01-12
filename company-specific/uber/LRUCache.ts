class DLNode1 {
  key: number;
  value: number;
  next?: DLNode1;
  prev?: DLNode1;
  constructor(key: number, value: number, prev?: DLNode1, next?: DLNode1) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class LRUCache {
  nodeMap: Map<number, DLNode1>;
  capacity: number;
  head?: DLNode1;
  tail?: DLNode1;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.nodeMap = new Map();
    this.head = undefined;
    this.tail = undefined;
  }

  get(key: number): number {
    //  console.log(this.head)
    if (!this.nodeMap.has(key)) {
      return -1;
    }

    const node = this.nodeMap.get(key) as DLNode1;
    this.deleteNode(node);
    this.addNode(node);
    // console.log(this.head)
    return node.value;
  }

  put(key: number, value: number): void {
    if (!this.nodeMap.has(key)) {
      const node = new DLNode1(key, value);
      this.addNode(node);
    } else {
      const node = this.nodeMap.get(key) as DLNode1;
      this.deleteNode(node);
      this.addNode(node);
      node.value = value;
    }

    // console.log("s", this.nodeMap.size, this.capacity);
    if (this.nodeMap.size > this.capacity) {
      // console.log(this.head)
      this.deleteNode(this.head as DLNode1);
    }
    // console.log("e", this.nodeMap.size, this.capacity);
  }

  deleteNode(node: DLNode1) {
    if (this.head === this.tail) {
      this.head = undefined;
      this.tail = undefined;
    } else if (this.head === node) {
      const newHead = this.head.next as DLNode1;
      newHead.prev = undefined;
      this.head = newHead;
    } else if (this.tail === node) {
      const newTail = this.tail.prev as DLNode1;
      newTail.next = undefined;
      this.tail = newTail;
    } else {
      const prev = node.prev;
      const next = node.next;
      if (prev) {
        prev.next = next;
      }
      if (next) {
        next.prev = prev;
      }

      node.next = undefined;
      node.prev = undefined;
    }
    this.nodeMap.delete(node.key);
  }

  addNode(node: DLNode1) {
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      node.next = undefined;
      this.tail = node;
    }
    this.nodeMap.set(node.key, node);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
