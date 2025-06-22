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
  const inOrderMap = inorder.reduce((acc, v, i) => {
    acc.set(v, i);
    return acc;
  }, new Map());

  return helper(preorder, 0, preorder.length - 1, inOrderMap, 0);
}

function helper(preorder, pStart, pEnd, inOrderMap, iStart) {
  if (pEnd < pStart) {
    return null;
  }
  const rootVal = preorder[pStart];
  const rootInorderIndex = inOrderMap.get(rootVal);
  const elementsInFirstHalf = rootInorderIndex - iStart;
  const pMid = pStart + elementsInFirstHalf;

  const node = new TreeNode(rootVal);
  node.left = helper(preorder, pStart + 1, pMid, inOrderMap, iStart);
  node.right = helper(
    preorder,
    pMid + 1,
    pEnd,
    inOrderMap,
    rootInorderIndex + 1
  );

  return node;
}
