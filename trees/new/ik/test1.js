/*
For your reference:
const TreeNode = class {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
};
*/
/**
 * @param {TreeNode_int32} root
 * @return {int32}
 */
function find_height(root) {
  if (!root) {
    return 0;
  }
  const result = [0];
  // Write your code here.
  dfs(root, 0, result);
  return result[0];
}

function dfs(node, level, result) {
  if (node.children.length === 0) {
    result[0] = Math.max(result[0], level);
    return;
  }

  for (const child of node.children) {
    dfs(child, level + 1, result);
  }
}
