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

let sumSoFar = 0;
function bstToGst(root: TreeNode | null): TreeNode | null {
  //   reverseInorder(root);
  //   console.log(result);
  return reverseInorder(root);
}

function reverseInorder(bstNode: TreeNode | null) {
  if (!bstNode) {
    return null;
  }
  const gstNode = new TreeNode(-1);
  bstNode.right = reverseInorder(bstNode.right);
  sumSoFar += bstNode.val;
  bstNode.val = sumSoFar;
  bstNode.left = reverseInorder(bstNode.left);
  return bstNode;
}
