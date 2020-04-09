class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addNode(key, val) {
    // O(1)
    const node = new Node(key, val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return node;
    }
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
    return node;
  }

  pushToTail(node) {
    // O(1)
    if (node === this.tail) {
      return;
    } else if (node === this.head) {
      this.head = this.head.next;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this.tail.next = node;
    node.prev = this.tail;
    node.next = null;

    this.tail = node;
  }
  evict() {
    const key = this.head.key;
    this.head = this.head.next;
    // Head Can be the only node there
    if (this.head) {
      this.head.prev = null;
    }
    return key;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.map = new Map();
  this.doublyLinkList = new DoublyLinkList();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (!this.map.has(key)) {
    return -1;
  }
  const node = this.map.get(key);
  this.doublyLinkList.pushToTail(node);
  return node.val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.map.has(key)) {
    const node = this.map.get(key);
    node.val = value;
    this.doublyLinkList.pushToTail(node);
    return null;
  }
  if (this.map.size === this.capacity) {
    const key = this.doublyLinkList.evict();
    this.map.delete(key);
  }
  const node = this.doublyLinkList.addNode(key, value);
  this.map.set(key, node);
  return null;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const arr2 = [
  [3],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [4],
  [3],
  [2],
  [1],
  [5, 5],
  [1],
  [2],
  [3],
  [4],
  [5]
];

const arr1 = [[1], [2, 1], [2], [3, 2], [2], [3]];
function getResult(arr) {
  const lru = new LRUCache(arr[0][0]);
  const result = [];
  for (let i = 1; i < arr.length; i++) {
    const [a, b] = arr[i];
    if (b !== undefined) {
      result.push(lru.put(a, b));
    } else {
      result.push(lru.get(a));
    }
    console.log(b !== undefined ? "put" : "get", arr[i], lru);
  }
  return { result, lru };
}

const { lru, result } = getResult(arr1);
// console.log(lru, result);
