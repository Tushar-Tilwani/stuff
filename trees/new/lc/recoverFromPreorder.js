function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
function recoverFromPreorder(traversal) {
  return dfs(traversal, 0, 0)[0];
}

function dfs(str, startIndex, level) {
  if (startIndex >= str.length) {
    return [null, startIndex];
  }

  const num = getDigit(str, startIndex);
  const node = new TreeNode(num);
  const newStartIndex = startIndex + num.length;

  if (!checkDash(str, newStartIndex, newStartIndex + level)) {
    return [node, newStartIndex];
  }

  const [leftNode, leftIndex] = dfs(str, newStartIndex + level + 1, level + 1);
  node.left = leftNode;

  if (!checkDash(str, leftIndex + 1, leftIndex + level)) {
    return [node, leftIndex];
  }
  const [rightNode, rightIndex] = dfs(str, leftIndex + level + 1, level + 1);
  node.right = rightNode;

  return [node, rightIndex];
}

function checkDash(str, startIndex, endIndex) {

  for (let i = startIndex; i <= endIndex; i++) {
    if (str[i] !== "-") {
      return false;
    }
  }
  return true;
}

function getDigit(str, startIndex) {
  const result = [];
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === "-") {
      break;
    }
    result.push(str[i]);
  }
  return result.join("");
}

let traversal = "1-401--349---90--88";
console.log(recoverFromPreorder(traversal));
