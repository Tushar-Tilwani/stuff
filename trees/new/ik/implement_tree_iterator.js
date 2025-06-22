/*
For your reference:
const BinaryTreeNode = class {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
};
*/
/**
 * @param {BinaryTreeNode_int32} root
 * @param {list_str} operations
 * @return {list_int32}
 */
function implement_tree_iterator(root, operations) {
  // Write your code here.
  const treeIterator = new TreeIterator(root);

  return operations.map((op) => {
    if (op === "next") {
      return treeIterator.next();
    }
    return treeIterator.has_next();
  });
}

class TreeIterator {
  constructor(root) {
    // This is a constructor.
    // Initialize required data structures.
    this.inorder = [];
    this._fillStack(root);
  }

  next() {
    // ...
    if (this.inorder.length === 0) {
      return 0;
    }
    const node = this.inorder.pop();
    this._fillStack(node.right);
    return node.value;
  }

  has_next() {
    // Or you can return bool here and convert it
    // to int in function implement_tree_iterator.
    return this.inorder.length > 0 ? 1 : 0;
  }
  _fillStack(node) {
    while (node) {
      this.inorder.push(node);
      node = node.left;
    }
  }
}
