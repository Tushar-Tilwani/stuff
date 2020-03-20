/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    https://leetcode.com/problems/largest-bst-subtree/

*/

/*
 * Complete the function below.
 */

function largestBSTSubtree(root) {
  const result = [1];
  dfs(root, result);
  return result[0];
}

function dfs(node, result) {
  if (node.left === null && node.right === null) {
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
  if (node.left) {
    let leftTreeResult = dfs(node.left, result);
    isBST = isBST && leftTreeResult.isBST && node.val > leftTreeResult.maxVal;
    numberOfNodes = numberOfNodes + leftTreeResult.numberOfNodes;
    // leftValue = node.left.val;
    minVal = Math.min(minVal, leftTreeResult.minVal);
  }

  // let rightValue = Infinity;
  let maxVal = node.val;
  if (node.right) {
    let righTreeResult = dfs(node.right, result);
    isBST = isBST && righTreeResult.isBST && node.val < righTreeResult.minVal;
    numberOfNodes = numberOfNodes + righTreeResult.numberOfNodes;
    rightValue = node.right.val;
    maxVal = Math.max(maxVal, righTreeResult.maxVal);
  }

  // isBST = isBST && rightValue > leftValue;

  if (isBST && numberOfNodes > result[0]) {
    result[0] = numberOfNodes;
  }

  return { isBST, numberOfNodes, minVal, maxVal };
}
