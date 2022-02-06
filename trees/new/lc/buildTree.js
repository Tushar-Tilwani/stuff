/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
  helper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);
}

function helper(preorder, pStart, pEnd, inorder, iStart, iEnd) {
  if (pEnd < pStart || iEnd < iStart) {
    return null;
  }
  const rootVal = preorder[pStart];
  if (pEnd === pStart) {
    return new TreeNode(rootVal);
  }
  let iMid = iStart;
  while (iMid <= iEnd) {
    if (rootVal === inorder[iMid]) {
      break;
    }
    iMid++;
  }

  const subRoot = new TreeNode(rootVal);
  const diff = iMid - iStart;
  const pMid = pStart + diff;
  subRoot.left = helper(preorder, pStart + 1, pMid, inorder, iStart, iMid - 1);
  subRoot.right = helper(preorder, pMid + 1, pEnd, inorder, iMid + 1, iEnd);
  return subRoot;
}
