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
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  const inOrder = [...preorder].sort((a, b) => a - b);
  const end = preorder.length - 1;
  return getNode(inOrder, 0, end, preorder, 0, end);
};

function getNode(inOrder, iStart, iEnd, preorder, pStart, pEnd) {
  if (iEnd < iStart) {
    return null;
  }
  const currentVal = preorder[pStart];
  const iMid = inOrder.findIndex((v) => v === currentVal);
  const pDist = iMid - iStart;
  const root = new TreeNode(currentVal);

  root.left = getNode(
    inOrder,
    iStart,
    iMid - 1,
    preorder,
    pStart + 1,
    pStart + pDist
  );

  root.right = getNode(
    inOrder,
    iMid + 1,
    iEnd,
    preorder,
    pStart + pDist + 1,
    pEnd
  );
  return root;
}
