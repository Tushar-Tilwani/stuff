class Node {
  constructor(key, value, next = null, prev = null) {
    this.key = key;
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(key, value) {
    if (this.head === null) {
      // When it's first node;
      this.head = new Node(key, value);
      this.tail = this.head;
      return this.head;
    }
    // always make new head
    const prevHead = this.head;
    this.head = new Node(key, value);
    this.head.next = prevHead;
    prevHead.prev = this.head;

    return this.head;
  }

  delete(node) {
    if (!node) {
      // delete tail
      if (this.tail === null) {
        return null;
      }
      if (this.tail === this.head) {
        // delete head
        this.head = null;
      }
      const prevTail = this.tail;
      this.tail = prevTail.prev;
      prevTail.prev = null;
      return prevTail;
    }
    const prev = node.prev;
    const next = node.next;
    // delete node
    if (node === this.tail) {
      if (this.tail === this.head) {
        // delete head
        this.head = null;
      }
      this.tail = prev;
      node.prev = null;
      return node;
    }

    if (node === this.head) {
      this.head = next;
      node.next = null;
      return node;
    }

    prev.next = next;
    next.prev = prev;

    //  For garabage collection
    node.next = null;
    node.prev = null;
    return node;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
  this.list = new DoublyLinkList();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) {
    return -1;
  }
  const node = this.map.get(key);
  this.list.delete(node);
  const newNode = this.list.add(node.key, node.value);
  this.map.set(key, newNode);
  return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (!this.map.has(key)) {
    const node = this.list.add(key, value);
    this.map.set(key, node);
  } else {
    const node = this.map.get(key);
    this.list.delete(node);
    const newNode = this.list.add(node.key, value);
    this.map.set(key, newNode);
  }

  if (this.map.size > this.capacity) {
    const node = this.list.delete();
    this.map.delete(node.key);
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
