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
 * @param {BinaryTreeNode_int32} root
 * @return {int32}
 */
function find_largest_bst(root) {
  if (!root) {
    return 0;
  }
  const result = [1];
  dfs(root, result);
  return result[0];
}

function dfs(node, result) {
  if (!node.left && !node.right) {
    return [true, 1, node.value, node.value];
  }

  let currentBst = true;
  let count = 1;
  let minValue = Infinity;
  let maxValue = -Infinity;

  if (node.left) {
    const [isLeftBst, leftCount, leftMinValue, leftMaxValue] = dfs(
      node.left,
      result
    );

    const currentLeftBst = isLeftBst && node.value > leftMaxValue;
    count += leftCount;

    currentBst = currentBst && currentLeftBst;
    minValue = Math.min(minValue, leftMinValue);
    maxValue = Math.max(maxValue, leftMaxValue);
  }

  if (node.right) {
    const [isRightBst, rightCount, rightMinValue, rightMaxValue] = dfs(
      node.right,
      result
    );
    const currentRightBst = isRightBst && node.value < rightMinValue;
    count += rightCount;

    currentBst = currentBst && currentRightBst;
    minValue = Math.min(minValue, rightMinValue);
    maxValue = Math.max(maxValue, rightMaxValue);
  }

  if (currentBst) {
    result[0] = Math.max(result[0], count);
  }
  // console.log('count', count,result, node.value, currentBst);

  return [
    currentBst,
    count,
    Math.min(minValue, node.value),
    Math.max(maxValue, node.value),
  ];
}
