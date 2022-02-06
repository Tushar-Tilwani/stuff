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
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function(root) {
    const result = [];
    //dfs(node, depth, path, maxDepth, result);
    dfs(root, 0, [], [-1], result);
    // console.log(result);
    const resLen = result.length;
    const len = result[0].length - 1;
  
    if (resLen === 1) {
      return result[0][len];
    }
  
    for (let j = len; j >= 0; j--) {
      let node = result[0][j];
      let nodeFound = null;
      
      for (let i = 1; i < result.length; i++) {
        if (node !== result[i][j]) {
          nodeFound = null;
          break;
        } else {
          nodeFound = node;
        }
      }
      if (nodeFound) {
        return nodeFound;
      }
    }
  
    return null;
  };
  
  function dfs(node, depth, path, maxDepth, result) {
    path.push(node);
    if (node.left === null && node.right === null) {
      if (depth > maxDepth[0]) {
        maxDepth[0] = depth;
        // Empty Array
        result.splice(0, result.length);
        result.push(path.slice(0));
      } else if (depth === maxDepth[0]) {
        result.push(path.slice(0));
      }
      path.pop();
      return;
    }
  
    if (node.left !== null) {
      dfs(node.left, depth + 1, path, maxDepth, result);
    }
    if (node.right !== null) {
      dfs(node.right, depth + 1, path, maxDepth, result);
    }
    path.pop();
  }
  