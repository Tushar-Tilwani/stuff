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
/**
 * @param {list_int32} inorder
 * @param {list_int32} preorder
 * @return {BinaryTreeNode_int32}
 */
function construct_binary_tree(inorder, preorder) {
  // Write your code here.
  const inorderMap = inorder.reduce((map, val, index) => {
    map.set(val, index);
    return map;
  }, new Map());
  return dfs(
    preorder,
    0,
    preorder.length - 1,
    inorderMap,
    0,
    inorder.length - 1
  );
}

function dfs(preorder, pStart, pEnd, inorderMap, iStart, iEnd) {
  if (pStart > pEnd || iStart > iEnd) {
    return null;
  }
  const nodeVal = preorder[pStart];
  const iMid = inorderMap.get(nodeVal);
  const leftNumOfNodes = iMid - iStart;
  const pMid = pStart + leftNumOfNodes;
  const node = new BinaryTreeNode(nodeVal);
  node.left = dfs(preorder, pStart + 1, pMid, inorderMap, iStart, iMid - 1);
  node.right = dfs(preorder, pMid + 1, pEnd, inorderMap, iMid + 1, iEnd);
  return node;
}
