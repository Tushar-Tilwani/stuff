/*
For your reference:
const BinaryTreeNode = class {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.next_right = null;
    }
};
*/
/**
 * @param {BinaryTreeNode_int32} root
 * @return {BinaryTreeNode_int32}
 */
function populate_sibling_pointers(root) {
  if (!root) {
    return null;
  }
  const QUEUE = [root];

  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    let prev = null;
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift();
      if (prev) {
        prev.next_right = node;
      }
      if (node.left) {
        QUEUE.push(node.left);
      }
      if (node.right) {
        QUEUE.push(node.right);
      }
      prev = node;
    }
  }
  // Write your code here.
  return root;
}
