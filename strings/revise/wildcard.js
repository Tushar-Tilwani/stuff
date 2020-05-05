// https://leetcode.com/problems/wildcard-matching/
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function(s, p) {
  const trie = new Trie(["car", "ca", "cat", "ccvv", "dog"]);
  return trie.wildCardSearch("c?t");
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

  wildCardSearch(prefix) {
    return removeDuplicates(this._wildCardSearch(prefix));
  }

  _wildCardSearch(
    prefix,
    node = this.rootNode,
    path = [],
    prefixIndex = 0,
    result = []
  ) {
    const prefixChar = prefix[prefixIndex];
    if (prefixIndex === prefix.length) {
      if (node.children.has(END_CHAR)) {
        result.push(path.join(""));
      }
      return result;
    }

    if (node.char === END_CHAR) {
      return;
    }

    if (prefixChar === "*") {
      // No Value
      this._wildCardSearch(prefix, node, path, prefixIndex + 1, result);
      // All Values
      for (const child of node.children.values()) {
        if (child.char === END_CHAR) {
          continue;
        }
        path.push(child.char);
        this._wildCardSearch(prefix, child, path, prefixIndex, result);
        path.pop();
      }
      return result;
    }

    if (prefixChar === "?") {
      for (const child of node.children.values()) {
        if (child.char === END_CHAR) {
          continue;
        }
        path.push(child.char);
        this._wildCardSearch(prefix, child, path, prefixIndex + 1, result);
        path.pop();
      }
      return result;
    }

    if (node.children.has(prefixChar)) {
      path.push(prefixChar);
      this._wildCardSearch(
        prefix,
        node.children.get(prefixChar),
        path,
        prefixIndex + 1,
        result
      );
      path.pop();
    }
    return result;
  }

  dfs(node, prefix, path = [], result = []) {
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

function removeDuplicates(result) {
  return Array.from(new Set(result));
}

console.log(isMatch());
