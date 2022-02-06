class TreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  find(key) {
    let node = this.root;
    while (node !== null) {
      if (node.key === key) {
        return node;
      } else if (key < node.key) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return null;
  }

  insert(key) {
    let prev = null;
    let node = this.root;

    while (node !== null) {
      prev = node;
      if (node.key === key) {
        return;
      } else if (key < node.key) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    const insertNode = new TreeNode(key);

    if (prev === null) {
      this.root = insertNode;
    } else if (key < prev.key) {
      prev.left = insertNode;
    } else {
      prev.right = insertNode;
    }
  }

  min() {
    let node = this.root;
    let prev = null;
    while (node !== null) {
      prev = node;
      node = node.left;
    }
    if (prev === null) {
      // When there is only one node;
      return node && node.key;
    }
    return prev.key;
  }

  max() {
    let prev = null;
    let node = this.root;

    while (node !== null) {
      prev = node;
      node = node.right;
    }

    if (prev === null) {
      return node && node.key;
    }
    return prev.key;
  }

  inOrder() {
    const result = [];
    this._inOrder(this.root, result);
    return result;
  }

  _inOrder(node, result) {
    if (node === null) {
      return;
    }
    this._inOrder(node.left, result);
    result.push(node.key);
    this._inOrder(node.right, result);
  }

  sucessor(key) {
    // case 1: when right subtree is avialable
    let node = this.root;
    let potentialSuccesor = null;
    while (node !== null) {
      if (node.key === key) {
        break;
      } else if (key < node.key) {
        potentialSuccesor = node;
        node = node.left;
      } else {
        node = node.right;
      }
    }

    // Key not found
    if (node === null) {
      return null;
    }

    if (node.right !== null) {
      node = node.right;
      while (node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return potentialSuccesor && potentialSuccesor.key;
  }

  delete(key) {
    let node = this.root;
    let prev = null;
    let potentialSuccesor = null;
    let potentialSuccesorParent = null;

    while (node !== null) {
      prev = node;
      if (key === node.key) {
        break;
      } else if (key < node.left) {
        potentialSuccesorParent = potentialSuccesor;
        potentialSuccesor = node;
        node = node.left;
      } else {
        node = node.right;
      }
    }

    // case 0: When node was not found
    if (node === null) {
      return null;
    }

    // Case 1: When key is a leaf node
    if (node.left === null && node.right === null) {
      // Tree has only root node
      if (prev === null) {
        this.root = null;
      } else if (prev.left === node) {
        prev.left = null;
      } else {
        prev.right = null;
      }
      return node;
    }

    // Case 2: When key has either left or right child

    // Case 2a: When key has left child but no right child
    if (node.left !== null && node.right === null) {
      // Tree has only root node
      if (prev === null) {
        this.root = node.left;
      } else if (prev.left === node) {
        prev.left = node.left;
      } else {
        prev.right = node.left;
      }
      return node;
    }

    // Case 2b: When key has right child but no left child
    if (node.left === null && node.right !== null) {
      // Root node has to be deleted
      if (prev === null) {
        this.root = node.right;
      } else if (prev.left === node) {
        prev.left = node.right;
      } else {
        prev.right = node.right;
      }
      return node;
    }

    // Case 3: When key has left and right child both
    if (node.left !== null && node.right !== null) {
      if (prev === null) {
        // Root node has to be deleted
        // Will find sucessor replace root node with that
        let successorParent = node;
        let successor = node.right;

        while (successor.left !== null) {
          successorParent = successor;
          successor = successor.left;
        }

        node.key = successor.key;

        if (successorParent.left === successor) {
          successorParent.left = null;
        } else {
          successorParent.right = null;
        }
      } else {
        node.key = potentialSuccesor.key;

        if (potentialSuccesorParent.left === potentialSuccesor) {
          potentialSuccesorParent.left = null;
        } else {
          potentialSuccesorParent.right = null;
        }
      }
    }
  }
}

const bst = new BST();
// console.log("min", bst.min());
// console.log("max", bst.max());
console.log("sucessor", bst.sucessor(3));

bst.insert(5);
// console.log("min", bst.min());
// console.log("max", bst.max());
console.log("sucessor", bst.sucessor(5));
bst.insert(2);
bst.insert(8);
bst.insert(9);
bst.insert(1);
bst.insert(11);
bst.insert(6);
bst.insert(12);

console.log("sucessor", bst.sucessor(8));

// console.log("min", bst.min());
// console.log("max", bst.max());
// console.log(bst.inOrder());
// console.log(bst.find(8));

