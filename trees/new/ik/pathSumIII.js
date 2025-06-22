//NOT DONE YET

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
function pathSum(root, targetSum) {
  if (!root) {
    return [];
  }
  const result = [];
  dfs(root, targetSum, [], result);
  return result;
}

function dfs(node, target, slate, sumSlates, result) {
  if (!node) {
    return;
  }

  slate.push(node.val);
  addToSumSlates(sumSlates, val);
  const k = findTarget(sumSlates, val);
  if (k >= 0) {
  }
  dfs(node.left, target, slate, sumSlates, result);
  dfs(node.right, target, slate, sumSlates, result);
  removeFromSumSlates(sumSlates, val);
  slate.pop();
}

function addToSumSlates(sumSlates, val) {
  for (let i = 0; i < sumSlates.length; i++) {
    sumSlates[i] += val;
  }
  sumSlates.push(val);
}

function removeFromSumSlates(sumSlates, val) {
  for (let i = 0; i < sumSlates.length; i++) {
    sumSlates[i] -= val;
  }
  sumSlates.pop();
}

function findTarget(sumSlates, val) {
  return sumSlates.findIndex((slateVal) => slateVal === val);
}
