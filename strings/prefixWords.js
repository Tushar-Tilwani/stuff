/* 
https://www.youtube.com/watch?v=3hbEBJvXNQc&feature=emb_logo
*/

function dfsRootPaths(node, path, result) {
  const children = Object.values(node.children);
  if (node.isWord) {
    result.push(path.slice(0));
    return;
  }
  for (const childNode of children) {
    path.push(childNode.char);
    dfsRootPaths(childNode, path, result);
    path.pop();
  }
}

class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = {};
    this.isWord = false;
  }
}

class Trie {
  constructor(words) {
    this.root = new TrieNode(null);
    for (const word of words) {
      this.addWord(word);
    }
  }
  findSubsetPrefix() {
    const result = [];
    dfsRootPaths(this.root, [], result);
    return result.map(v => v.join(""));
  }
  addWord(word) {
    const chars = word.split("");
    let node = this.root;
    for (const char of chars) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(char);
      }
      node = node.children[char];
    }
    node.isWord = true;
  }
}

const trie = new Trie(["abc", "abs", "cfg", "abh", "aks", "abhh", "ab"]);
console.log(trie.findSubsetPrefix());
