/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  const end = preorder.length - 1;
  const inorder = preorder.slice(0).sort((a, b) => a - b);
  return getTree(preorder, 0, end, inorder, 0, end);
};

function getTree(preorder, pS, pE, inorder, iS, iE) {
  const val = preorder[pS];
//   console.log(pE, pS);
  if (pE < pS || iE < iS || val === undefined) {
    return null;
  }

  const node = new TreeNode(val);
  const iM = inorder.findIndex((v) => v === val);
  const pM = pS + (iM - iS);
  node.left = getTree(preorder, pS + 1, pM, inorder, iS, iM - 1);
  node.right = getTree(preorder, pM + 1, pE, inorder, iM + 1, iE);
  return node;
}

console.log(bstFromPreorder([8, 5, 1, 7, 10, 12]));
