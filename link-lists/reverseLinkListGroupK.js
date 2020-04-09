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

Sample Input 1:



list: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> NULL

k: 3



Sample Output 1:


3 -> 2 -> 1 -> 6 -> 5 -> 4 -> NULL
*/
function reverse_linked_list_in_groups_of_k(head, k) {
  //   console.log(first.val, node.val, prev.val);
  return helper(head, null, k);
}

function helper(head, prevHead, k) {
  if (!head) {
    return null;
  }

  let prev = prevHead;
  let node = head;

  for (let i = 0; i < k; i++) {
    if (!node) {
      break;
    }
    const next = node.next;
    node.next = prev;
    prev = node;
    node = next;
  }
  head.next = helper(node, head, k);
  return prev;
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

const head = reverse_linked_list_in_groups_of_k(
  getLinkList([1, 2, 3, 4, 5, 6]),
  3
);
console.log(getArray(head));
