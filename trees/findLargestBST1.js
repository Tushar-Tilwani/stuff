/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left_ptr_ptr = null;
            this.right_ptr_ptr = null;
        }
    }
*/

/*
 * Complete the function below.
 */

function findLargestBST(root) {
  if(!root){
      return 0;
  }
const result = [1];
dfs(root, result);
return result[0];
}

function dfs(node, result) {
if (node.left_ptr === null && node.right_ptr === null) {
  return {
    isBST: true,
    numberOfNodes: 1,
    minVal: Math.min(result.minVal || Infinity, node.val),
    maxVal: Math.max(result.maxVal || -Infinity, node.val)
  };
}

let isBST = true;
let numberOfNodes = 1;

// let leftValue = -Infinity;
let minVal = node.val;
if (node.left_ptr) {
  let leftTreeResult = dfs(node.left_ptr, result);
  isBST = isBST && leftTreeResult.isBST && node.val > leftTreeResult.maxVal;
  numberOfNodes = numberOfNodes + leftTreeResult.numberOfNodes;
  // leftValue = node.left_ptr.val;
  minVal = Math.min(minVal, leftTreeResult.minVal);
}

// let rightValue = Infinity;
let maxVal = node.val;
if (node.right_ptr) {
  let righTreeResult = dfs(node.right_ptr, result);
  isBST = isBST && righTreeResult.isBST && node.val < righTreeResult.minVal;
  numberOfNodes = numberOfNodes + righTreeResult.numberOfNodes;
  rightValue = node.right_ptr.val;
  maxVal = Math.max(maxVal, righTreeResult.maxVal);
}

// isBST = isBST && rightValue > leftValue;

if (isBST && numberOfNodes > result[0]) {
  result[0] = numberOfNodes;
}

return { isBST, numberOfNodes, minVal, maxVal };
}


