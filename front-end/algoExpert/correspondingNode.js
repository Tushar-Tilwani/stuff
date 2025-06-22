function correspondingNode(tree1, tree2, node1) {
  // Write your code here.
  if (tree1 === node1) {
    return tree2;
  }
  const children1 = Array.from(tree1.children);
  const children2 = Array.from(tree2.children);
  let result = null;
  for (let i = 0; i < children1.length; i++) {
    result = result || correspondingNode(children1[i], children2[i], node1);
  }
  return result;
}

// Do not edit the line below.
exports.correspondingNode = correspondingNode;
