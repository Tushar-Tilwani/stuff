

function lowestCommonAncestor(root, node_a, node_b) {
  if (root === null) {
    return null;
  }
  const result = [];
  helper(root, node_a, node_b, [], result);
  return findLeast(result[0], result[1]);
}

function helper(node, node_a, node_b, slate, result) {
  if (node.data === node_a.data || node.data === node_b.data) {
    result.push([...slate, node]);
  }

  slate.push(node);

  if (node.left !== null) {
    helper(node.left, node_a, node_b, slate, result);
  }

  if (node.right !== null) {
    helper(node.right, node_a, node_b, slate, result);
  }

  slate.pop();
}

function findLeast(path1, path2) {
  if (!path1 || !path2) {
    return null;
  }

  let result = null;
  const len = Math.min(path1.length, path2.length);
  for (let i = 0; i < len; i++) {
    if (path1[i].data !== path2[i].data) {
      break;
    }
    result = path1[i];
  }
  return result;
}
