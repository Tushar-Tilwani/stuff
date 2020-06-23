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
    const preHead = new Node(null, null);
    this.preHead = preHead;
    this.tail = preHead;
  }

  removeNode(node) {
    const previousNode = node.prev;
    const nextNode = node.next;

    if (previousNode === this.preHead && nextNode === null) {
      this.tail = previousNode;
    }

    // if (nextNode === this.tail) {
    //     this.tail = previousNode;
    //   }

    if (previousNode) {
      previousNode.next = nextNode;
    }

    if (nextNode) {
      nextNode.prev = previousNode;
    }
  }

  addNode(key, value) {
    const newTail = new Node(key, value);

    newTail.prev = this.tail;
    newTail.next = null;

    this.tail.next = newTail;

    this.tail = newTail;
    return newTail;
  }

  makeNewTail(newTail) {
    if (newTail === this.tail) {
      return;
    }
    this.removeNode(newTail);

    newTail.prev = this.tail;
    newTail.next = null;

    this.tail.next = newTail;

    this.tail = newTail;
    return newTail;
  }

  getHead() {
    return this.preHead.next;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.doublyLinkList = new DoublyLinkList();
  this.linkMap = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  const { linkMap, doublyLinkList } = this;
  if (!linkMap.has(key)) {
    return -1;
  }
  const newTail = linkMap.get(key);
  doublyLinkList.makeNewTail(newTail);
  return newTail.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  const { linkMap, doublyLinkList } = this;
  if (linkMap.has(key)) {
    const newTail = linkMap.get(key);
    doublyLinkList.makeNewTail(newTail);
    newTail.value = value;
    return null;
  }

  const currentCapacity = linkMap.size;
  if (currentCapacity === this.capacity) {
    const head = doublyLinkList.getHead();
    this.delete(head.key);
  }

  linkMap.set(key, doublyLinkList.addNode(key, value));
};

LRUCache.prototype.delete = function(key) {
  const { linkMap, doublyLinkList } = this;
  if (!linkMap.has(key)) {
    return null;
  }
  const deleteNode = linkMap.get(key);
  doublyLinkList.removeNode(deleteNode);
  linkMap.delete(key);
  return key;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
