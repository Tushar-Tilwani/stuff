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
function zip_given_linked_list(head) {
  let [len, tail] = getLength(head);
  while (len > 2) {
    const mid = Math.floor(len / 2);
    const prevOfMidNode = getNodeAtK(head, mid - 1);
  }
}

function getLength(head) {
  let node = head;
  let len = 0;
  while (node.next) {
    node = node.next;
    len += 1;
  }
  return [len, node];
}

function getNodeAtK(head, k) {
  let node = head;
  let c = 0;
  while (node) {
    if (c === k) {
      return node;
    }
    node = node.next;
    len += 1;
  }
  return len;
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
