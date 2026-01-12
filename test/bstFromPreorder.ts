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

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function bstFromPreorder(preorder: number[]): TreeNode | null {
  const inOrder = [...preorder].sort((a, b) => a - b);
  const end = preorder.length - 1;

  return helper(preorder, 0, end, inOrder, 0, end);
}

function helper(
  preorder: number[],
  pStart: number,
  pEnd: number,
  inOrder: number[],
  iStart: number,
  iEnd: number
): TreeNode | null {
  if (iStart > iEnd || pStart > pEnd) {
    return null;
  }
  const currVal = preorder[pStart];
  const iMid = inOrder.findIndex((val) => val === currVal);
  const numOfVals = iMid - iStart;
  const pMid = pStart + numOfVals;

  return new TreeNode(
    currVal,
    helper(preorder, pStart + 1, pMid, inOrder, iStart, iMid - 1),
    helper(preorder, pMid + 1, pEnd, inOrder, iMid + 1, iEnd)
  );
}
