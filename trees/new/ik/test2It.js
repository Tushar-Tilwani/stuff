/*
For your reference:
const BinaryTreeNode = class {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};
*/
/**
 * @param {BinaryTreeNode_int32} root
 * @param {int32} k
 * @return {int32}
 */
function kth_smallest_element(root, k) {
  if (!root) {
    return null;
  }
  const STACK = [[root, false]];
  let count = 0;
  while (STACK.length !== 0) {
    const [node, visited] = STACK.pop();
    if (visited) {
      count += 1;
      if (count === k) {
        return node.value;
      }
    } else {
      node.right && STACK.push([node.right, false]);
      STACK.push([node, true]);
      node.left && STACK.push([node.left, false]);
    }
  }

  return null;
}
