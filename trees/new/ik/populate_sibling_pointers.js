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
  // Write your code here.
  dfs(root, 0, new Map());
  return root;
}

function dfs(node, level, prevMap) {
  if (!node) {
    return;
  }
  dfs(node.left, level + 1, prevMap);
  dfs(node.right, level + 1, prevMap);
  if (prevMap.has(level)) {
    prevMap.get(level).next_right = node;
  }
  prevMap.set(level, node);
}
