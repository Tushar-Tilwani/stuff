/*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */

function addTwoNumbers(l_a, l_b) {
  // Write your code here
  const prevHead = new SinglyLinkedListNode(null);
  let node = prevHead;
  let nodeA = l_a;
  let nodeB = l_b;

  let digitSum = 0;
  let carryOver = 0;
  while (nodeA && nodeB) {
    digitSum = carryOver + nodeA.data + nodeB.data;
    node.next = new SinglyLinkedListNode(digitSum % 10);
    carryOver = Math.floor(digitSum / 10);
    node = node.next;
    nodeA = nodeA.next;
    nodeB = nodeB.next;
  }

  while (nodeA) {
    digitSum = carryOver + nodeA.data;
    node.next = new SinglyLinkedListNode(digitSum % 10);
    carryOver = Math.floor(digitSum / 10);
    node = node.next;
    nodeA = nodeA.next;
  }

  while (nodeB) {
    digitSum = carryOver + nodeB.data;
    node.next = new SinglyLinkedListNode(digitSum % 10);
    carryOver = Math.floor(digitSum / 10);
    node = node.next;
    nodeB = nodeB.next;
  }

  if (carryOver) {
    node.next = new SinglyLinkedListNode(carryOver);
  }

  return prevHead.next;
}

function SinglyLinkedListNode(data) {
  this.data = data;
  this.next = null;
}

function getLinkList(arr = [1, 2, 9]) {
  const head = new SinglyLinkedListNode(arr[0]);
  let node = head;
  for (let i = 1; i < arr.length; i++) {
    node.next = new SinglyLinkedListNode(arr[i]);
    node = node.next;
  }
  return head;
}
function getArray(head) {
  const arr = [];
  let node = head;
  while (node) {
    arr.push(node.data);
    node = node.next;
  }
  return arr;
}

console.log(getArray(addTwoNumbers(getLinkList(), getLinkList([9, 1, 1]))));
