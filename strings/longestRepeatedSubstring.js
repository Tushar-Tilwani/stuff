/*
 * Complete the 'getLongestRepeatedSubstring' function below.
 */

function getLongestRepeatedSubstring(inputStr) {
  // Write your code here
  const suffixTree = new SuffixTree(inputStr);
  return suffixTree.findLongestRepeatedSubstring();
}

const END_CHAR = "$";
class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = {};
    this.isWord = false;
  }
}
class SuffixTree {
  constructor(word) {
    this.root = new TrieNode(null);
    this.addWord(word, END_CHAR);
  }

  findLongestRepeatedSubstring() {
    function dfs(node, result, depth = 0, path = []) {
      if (node.char === END_CHAR) {
        return;
      }
      const children = Object.values(node.children);

      if (result.maxDepth < depth && children.length > 1) {
        result.maxDepth = depth;
        result.ans = path.join("");
      }

      for (const childNode of children) {
        path.push(childNode.char);
        dfs(childNode, result, depth + 1, path);
        path.pop();
      }
    }

    const result = { maxDepth: 0, ans: "" };
    dfs(this.root, result);
    return result.ans;
  }

  addWord(word, endChar) {
    const len = word.length;
    for (let i = 0; i < len; i++) {
      this._addWord(word.slice(i, len), endChar);
    }
  }

  _addWord(word, endChar) {
    const chars = word.split("");
    let node = this.root;
    for (const char of chars) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(char);
      }
      node = node.children[char];
    }
    node.children[endChar] = new TrieNode(endChar);
  }
}

console.log(getLongestRepeatedSubstring("aabcabcyu"));
