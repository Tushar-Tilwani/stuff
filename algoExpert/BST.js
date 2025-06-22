// Do not edit the class below except for
// the insert, contains, and remove methods.
// Feel free to add new properties and methods
// to the class.

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    const newNode = new BST(value);
    let node = this;
    while (node !== null) {
      if (value < node.value) {
        if (node.left === null) {
          node.left = newNode;
          return this;
        }
        node = node.left;
        continue;
      }
      if (node.right === null) {
        node.right = newNode;
        return this;
      }
      node = node.right;
    }
    return this;
  }

  contains(value) {
    let node = this;
    while (node !== null) {
      if (value < node.value) {
        node = node.left;
        continue;
      }

      if (value > node.value) {
        node = node.right;
        continue;
      }
      return true;
    }
    return false;
  }

  nextNode(oNode) {
    let node = oNode.right;
    if (!oNode) {
      return node;
    }
    while (node.left) {}
  }

  remove(value) {
    let root = this;
    if (!root.left && !root.right) {
      return root;
    }

    let nextNode = null;
    let prevNode = null;
    let parentNode = null;
    let foundNode = null;
    const getNextNode = (node, pNode) => {
      if (!node || !!nextNode) {
        return;
      }
      if (node.value === value) {
        parentNode = pNode;
      }

      getNextNode(node.left, node);
      if (prevNode && prevNode.value === value) {
        nextNode = node;
        foundNode = prevNode;
      }
      prevNode = node;
      getNextNode(node.right, node);
    };
    getNextNode(this);

    if (foundNode === null) {
      return this;
    }

    if (foundNode.left === null && foundNode.right === null) {
      parentNode.left === foundNode
        ? (parentNode.left = null)
        : (parentNode.right = null);
      return this;
    }

    if (foundNode.left === null || foundNode.right === null) {
        parentNode.left === foundNode
          ? (parentNode.left = a4   af`dć   d`fnull)
          : (parentNode.right = null);
        return this;
      }

    console.log(nextNode?.value, parentNode?.value, foundNode?.value);
    return this;
  }
}

// Do not edit the line below.
exports.BST = BST;
