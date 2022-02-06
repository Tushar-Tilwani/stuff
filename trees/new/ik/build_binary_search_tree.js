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

const BinaryTreeNode = class {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
};
/**
 * @param {list_int32} preorder
 * @return {BinaryTreeNode_int32}
 */
function build_binary_search_tree(preorder) {
  // Write your code here.
  const inorderMap = preorder
    .slice(0)
    .sort((a, b) => a - b)
    .reduce((map, v, i) => {
      map.set(v, i);
      return map;
    }, new Map());
  return buildTree(preorder, 0, preorder.length - 1, inorderMap, 0);
}

function buildTree(preorder, pStart, pEnd, inorderMap, iStart) {
  if (pEnd < pStart) {
    return null;
  }
  if (pEnd === pStart) {
    return new BinaryTreeNode(preorder[pStart]);
  }

  const iMid = inorderMap.get(preorder[pStart]);
  const eleCount = Math.abs(iMid - iStart);
  const pMid = pStart + eleCount;
  const subRoot = new BinaryTreeNode(preorder[pStart]);
  subRoot.left = buildTree(preorder, pStart + 1, pMid, inorderMap, iMid - 1);
  subRoot.right = buildTree(preorder, pMid + 1, pEnd, inorderMap, iMid + 1);
  return subRoot;
}

console.log(build_binary_search_tree([100, 5, 3, -1, -100]));
