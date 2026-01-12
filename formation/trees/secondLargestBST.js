// JavaScript program to find the second largest element
// in BST using reverse inorder traversal

class BSTNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
function findSecondLargest(node) {
  if (!node) {
    return -1;
  }

  if (node.left === null && node.right === null) {
    // single node
    return -1;
  }

  const [largestNode, parentNode] = findTheRightMostNode(node);

  if (largestNode.left) {
    const [secondlargestNode] = findTheRightMostNode(largestNode.left);
    return secondlargestNode;
  }

  return parentNode;
}

function findTheRightMostNode(node, parentNode = null) {
  if (!node.right) {
    return [node, parentNode];
  }

  return findTheRightMostNode(node.right, node);
}




// Representation of the input BST:
//              7
//             / \
//            4   8
//           / \   
//          3   5 
const root = new Node(7);
root.left = new Node(4);
//root.right = new Node(8);
root.left.left = new Node(3);
root.left.right = new Node(5);

const secondLargest = findSecondLargest(root);

console.log(secondLargest);