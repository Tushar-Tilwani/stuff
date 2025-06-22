/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */

function connect(root) {
  if (!root) {
    return root;
  }
  return bfs(root);
}

function bfs(root) {
  const queue = [{ node: root, level: 0 }];
  let prev = { node: null, level: -1 };
  while (queue.length !== 0) {
    const { node, level } = queue.shift();
    const { node: prevNode, level: prevLevel } = prev;

    if (prevLevel === level) {
      prevNode.next = node;
    }

    if (node.left) {
      queue.push({ node: node.left, level: level + 1 });
    }

    if (node.right) {
      queue.push({ node: node.right, level: level + 1 });
    }
    prev = { node, level };
  }
  return root;
}
