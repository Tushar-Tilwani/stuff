/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

class Codec {
  constructor() {}

  /**
   * @param {Node} root
   * @return {string}
   */
  // Encodes a tree to a single string.
  // (root( (child 1 ( (Grandchild 1-1), (Grandchild 1-2) )), (child2 ( (Grandchild 2-1) )), (child3) ))
  serialize = function(root) {
    function dfs(node, path) {
      if (!node) {
        return;
      }
      path.push("(");
      path.push(node.val);
      for (const childNode of node.children) {
        path.push("(");
        dfs(childNode, path);
        path.push("),");
      }
      path.push(")");
    }

    const path = [];

    dfs(root, path);
    return path.join(" ");
  };

  /**
   * @param {string} data
   * @return {Node}
   */
  // Decodes your encoded data to tree.
  deserialize = function(data) {
    const nodeValues = data.split(",");
    const tempRoot = new Node(null, []);

    function flatten(nodeValues, index, parent) {
      if (nodeValues[index] === ")") {
        flatten(nodeValues, index + 1, parent);
        return;
      }

      if (nodeValues[index] === "(") {
        flatten(nodeValues, index + 1, parent);
        return;
      }
      let node = new Node(nodeValues[index], []);
      flatten(nodeValues, index + 1, node);
      parent.children.push(node);

      //   if (nodeValues[index] !== "(" || nodeValues[index] !== ")") {
      //     let node = new Node(nodeValues[index], []);
      //     flatten(nodeValues, index + 1, node);
      //     parent.children.push(node);
      //     return;
      //   }

      return parent;
    }
  };
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));
