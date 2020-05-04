// https://leetcode.com/problems/wildcard-matching/
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function(s, p) {
  const trie = new Trie(["car", "ca", "cat", "ccvv", "dog"]);
  return trie.findWords("c");
};

const END_CHAR = "$";
class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = new Map();
  }
}

class Trie {
  constructor(words) {
    this.rootNode = new TrieNode(null);
    for (const word of words) {
      this.addWord(word);
    }
  }

  addWord(word) {
    const chars = word.split("");
    let node = this.rootNode;
    for (const char of chars) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode(char));
      }
      node = node.children.get(char);
    }
    node.children.set(END_CHAR, new TrieNode(END_CHAR));
  }

  findWords(prefix) {
    let node = this.rootNode;
    const prefixChars = prefix.split("");
    for (const prefixChar of prefixChars) {
      if (!node.children.has(prefixChar)) {
        return [];
      }
      node = node.children.get(prefixChar);
    }
    return this.dfs(node, prefixChars, [], []);
  }

  dfs(node, prefix, path, result) {
    if (node.children.has(END_CHAR)) {
      result.push([...prefix, ...path].join(""));
    }
    for (const child of node.children.values()) {
      if (child.char === END_CHAR) {
        continue;
      }
      path.push(child.char);
      this.dfs(child, prefix, path, result);
      path.pop();
    }
    return result;
  }
}

console.log(isMatch());
