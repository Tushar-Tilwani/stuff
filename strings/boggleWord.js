/*
 * Complete the solver function below.
 *
 * The function accepts STRING_ARRAY dictionary as parameter.
 * and string array mat as input matrix.
 * The function returns the list of all possible words from dictionary
 * found in the matrix mat
 */

// Graph DFS solution

function boggle_solver(dictionary, mat) {
  // Write your code here
  return null;
}

class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor(words) {
    this.root = new TrieNode(null);
  }

  addWord(word) {
    const chars = word.split("");

    let node = this.root;
    for (const char of chars) {
      const trieNode = new TrieNode(char);
      node.children.set(char, trieNode);
      node = trieNode;
    }

    node.isWord = true;
  }

  removeWord(word) {
    let node = this.root;
    let prevNode = this.root;
    const chars = word.split("");

    for (const char of chars) {
      if (!node.children.has(char)) {
        break;
      }
      const trieNode = node.children.get(char);
      if (trieNode.children) {
      }
    }

    node.isWord = true;
  }
}

const mat = ["bsh", "tee", "arh"];
const dict = ["bst", "heap", "tree"];

console.log(boggle_solver(dict, mat));
