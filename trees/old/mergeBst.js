class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

/*
 * Complete the mergeTwoBSTs function below.
 */
function mergeTwoBSTs(root1, root2) {
  /*
   * Write your code here.
   */

  const keys1 = [];
  inOrder(root1, keys1);

  const keys2 = [];
  inOrder(root2, keys2);

  const mergedKeys = mergeSortedArray(keys1, keys2);
  const node = generateBinarySearchTree(mergedKeys, 0, mergedKeys.length - 1)



  const f = [];
  inOrder(node, f);
  return f;
}

function inOrder(node, result) {
  if (node === null) {
    return;
  }
  inOrder(node.left, result);
  result.push(node.val);
  inOrder(node.right, result);
}

function mergeSortedArray(arr1, arr2) {
  const result = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i += 1;
    } else {
      result.push(arr2[j]);
      j += 1;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i += 1;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j += 1;
  }

  return result;
}

function generateBinarySearchTree(sortedArr, start, end) {
  if (start > end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);
  const node = new Node(sortedArr[mid]);

  node.left = generateBinarySearchTree(sortedArr, start, mid - 1);
  node.right = generateBinarySearchTree(sortedArr, mid + 1, end);

  return node;
}
