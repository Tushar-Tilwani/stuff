/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left_ptr = null;
            this.right_ptr = null;
        }
    }

    The function takes two TREENODEs as inputs
    and is expected to return a TREENODE.

    Complete the function below.
*/
function merge_two_BSTs(root1, root2) {
  const sortedArr = [...inOrder(root1), ...inOrder(root2)].sort(
    (a, b) => a - b
  );
  return createBst(sortedArr);
}

function inOrder(node, result = []) {
  if (!node) {
    return;
  }
  inOrder(node.left_ptr, result);
  result.push(node.val);
  inOrder(node.right_ptr, result);
  return result;
}

function createBst(sortedArr, start = 0, end = sortedArr.length - 1) {
  if (end < start) {
    return null;
  }
  const mid = start + Math.floor((end - start) / 2);
  const node = new TreeNode(sortedArr[mid]);
  node.left_ptr = createBst(sortedArr, start, mid - 1);
  node.right_ptr = createBst(sortedArr, mid + 1, end);
  return node;
}
