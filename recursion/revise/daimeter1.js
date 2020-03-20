/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  if (root === null) {
    return 0;
  }
  const [diameter] = dfs(root);
  return diameter;
};

function dfs(node) {
  if (node.right == null && node.left == null) {
    return [0, 0];
  }
  let leftMaxDiameter = 0,
    leftMaxEdge = -1,
    rightMaxDiameter = 0,
    rightMaxEdge = -1;
  if (node.left !== null) {
    [leftMaxDiameter, leftMaxEdge] = dfs(node.left);
  }
  if (node.right !== null) {
    [rightMaxDiameter, rightMaxEdge] = dfs(node.right);
  }
  return [
    Math.max(leftMaxDiameter, rightMaxDiameter, 2 + leftMaxEdge + rightMaxEdge),
    Math.max(leftMaxEdge + 1, rightMaxEdge + 1)
  ];
}



/**
 * @param {string} s
 * @return {number}
 */
// J1 = SEP
// J2 = JOIN
// const OP = ['J', 'S'];
var numDecodings = function(s) {
  // if(!s || s.startsWith('0')){
  //     return 0;
  // }
  const result = [];
  perms(s.split(''), 0, [], result);
  // console.log(result);
  return result.length;
};

function perms(strArr, index, path, result){
  if(path.length > 0){
      const lastValue = path[path.length - 1];
  if(parseInt(lastValue) > 26 || lastValue.startsWith('0'))){
      return;
  }
  }
 
  
  if(index === strArr.length){
      result.push(path.slice(0));
      return;
  }
  
 
  
  for(let i=index;i<strArr.length;i++){
      path.push(strArr.slice(index, i+1).join(''));
      perms(strArr, i + 1, path, result);
      path.pop();
  }
}