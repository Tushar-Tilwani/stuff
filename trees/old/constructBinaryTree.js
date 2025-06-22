/*
 * Complete the 'constructBinaryTree' function below.
 *
 * The function accepts INTEGER_ARRAY inorder and preorder as parameter and returns Root pointer of constructed binary tree.
 * Definition for Binary tree.
 * function TreeNode(value){
 *     this.value = value
 *     this.left = null
 *     this.right = null
 * }
 */

function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function constructBinaryTree(inorder, preorder) {
  const INORDER_MAP = inorder.reduce((acc, value, index) => {
    acc[value] = index;
    return acc;
  }, {});

  // console.log(INORDER_MAP);

  function helper(iStart, iEnd, pStart, pEnd) {
    if (pStart > pEnd) {
      return null;
    }
    if (pStart === pEnd) {
      return new TreeNode(preorder[pStart]);
    }
    // Write your code here
    const node = new TreeNode(preorder[pStart]);

    const iIndex = INORDER_MAP[preorder[pStart]];
    const distance = iIndex - iStart;

    // console.log(leftInorder, leftPreOrder, rightInorder, rightPreOrder);
    //iStart, iEnd, pStart, pEnd
    node.left = helper(iStart, iIndex - 1, pStart + 1, distance + pStart);
    node.right = helper(iIndex + 1, iEnd, distance + pStart + 1, pEnd);

    return node;
  }

  return helper(0, inorder.length - 1, 0, preorder.length - 1);
}

let inorder = [3, 2, 1, 5, 4, 6],
  preorder = [1, 2, 3, 4, 5, 6];

console.log(constructBinaryTree(inorder, preorder));
