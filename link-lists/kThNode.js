/*
 * Complete the function below.
 */
/*
For the singly linked list head, the nodes are defined as:

const LinkedListNode = class {
    constructor(value) {
        this.val = value;
        this.next = null;
    }
};
*/
function swap_nodes(head, k) {
  const n = getLength(head);
  const k1 = k - 1;
  const k2 = n - k;
  const [node1, node2] = getLastFromK(head, k1 - 1, k2 - 1);
  // console.log(n, k1, k2, node1, node2);
  n < 3 ? swapLength2(node1, node2) : swapNext(node1, node2);
  return k1 === 0 ? node1.next : head;
}

function getLength(head) {
  let tailEnd = head;
  let len = 0;
  while (tailEnd) {
    tailEnd = tailEnd.next;
    len += 1;
  }
  return len;
}

function getLastFromK(head, k1, k2) {
  let node = { next: head };
  let k1Prev = null;
  let k2Prev = null;
  let c = -1;

  while (node) {
    if (c === k1) {
      k1Prev = node;
    }
    if (c === k2) {
      k2Prev = node;
    }
    node = node.next;
    c++;
  }
  return [k1Prev, k2Prev];
}

function swapNext(node1, node2) {
  const currTemp1 = node1.next;
  const nextTemp1 = node1.next && node1.next.next;

  const currTemp2 = node2.next;
  const nextTemp2 = node2.next && node2.next.next;

  if (currTemp1 === currTemp2) {
    return;
  }

  node1.next = currTemp2;
  node1.next.next = nextTemp1;

  node2.next = currTemp1;
  node2.next.next = nextTemp2;
}

function swapLength2(node1, node2) {
  const currTemp1 = node1.next;
  const currTemp2 = node2.next;

  currTemp2.next = currTemp1;
  currTemp1.next = null;

  node1.next = currTemp2;
}

function LinkedListNode(val) {
  this.val = val;
  this.next = null;
}

function getLinkList(arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
  const head = new LinkedListNode(arr[0]);
  let node = head;
  for (let i = 1; i < arr.length; i++) {
    node.next = new LinkedListNode(arr[i]);
    node = node.next;
  }
  return head;
}

function getArray(head) {
  const arr = [];
  let node = head;
  while (node) {
    arr.push(node.val);
    node = node.next;
  }
  return arr;
}

console.log(getArray(swap_nodes(getLinkList([0, 5, 1]), 1)));

// console.log(swap_nodes(getLinkList([0, 5,2]), 1));
