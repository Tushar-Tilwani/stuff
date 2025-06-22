class TrieNode {
  constructor(currentChar) {
    this.currentChar = currentChar;
    this.chars = new Map();
    this.isWord = false;
  }
}

var Trie = function () {
  this.root = new TrieNode(null);
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  const chars = word.split("");
  let node = this.root;
  for (const char of chars) {
    if (!node.chars.has(char)) {
      node.chars.set(char, new TrieNode(char));
    }
    node = node.chars.get(char);
  }
  node.isWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const chars = word.split("");
  let node = this.root;
  for (const char of chars) {
    node = node.chars.get(char);
    if (!node) {
      return false;
    }
  }
  return node.isWord;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  const chars = prefix.split("");
  let node = this.root;
  for (const char of chars) {
    node = node.chars.get(char);
    if (!node) {
      return false;
    }
  }
  return !!node;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
