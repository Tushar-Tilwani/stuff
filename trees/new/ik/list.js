/*
For your reference:
const LinkedListNode = class {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
};

const BinaryTreeNode = class {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};
*/
/**
 * @param {LinkedListNode_int32} head
 * @return {BinaryTreeNode_int32}
 */
function sorted_list_to_bst(head) {
  // Write your code here.
  const sortedArray = [];
  let node = head;
  while (node) {
    sortedArray.push(node.level);
    node = node.next;
  }
  return dfs(sortedArray);
}

function dfs(sortedArray, start = 0, end = sortedArray.length - 1) {
  if (end < start) {
    return null;
  }

  const mid = start + Math.floor((end - start) / 2);
  const node = new BinaryTreeNode(sortedArray[mid]);
  node.left = dfs(sortedArray, start, mid - 1);
  node.right = dfs(sortedArray, mid + 1, end);
  return node;
}
