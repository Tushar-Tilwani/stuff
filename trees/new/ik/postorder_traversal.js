/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left_ptr = null;
            this.right_ptr = null;
        }
    }
*/

// Complete the function below.
// The function takes a TREENODE as input and is expected to return an INTEGER ARRAY.
function postorder_traversal(root) {
  // [node, visited]
  const STACK = [[root, false]];
  const result = [];
  while (STACK.length !== 0) {
    // postorder
    const [node, visited] = STACK.pop();
    if (visited) {
      result.push(node.value);
    } else {
      STACK.push([node, true]);
      node.right && STACK.push([node.right, false]);
      node.left && STACK.push([node.left, false]);
    }
    // for post order keep it in front
  }

  return result;
}
