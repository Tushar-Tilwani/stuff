/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
let previous = new TreeNode();
/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  dfs(root);
}

function dfs(node) {
  //   console.log(previous?.val, node?.val);
  if (!node) {
    return;
  }
  const left = node.left;
  const right = node.right;

  previous.right = node;
  previous.left = null;
  previous = node;
  
  dfs(left);
  dfs(right);
}
