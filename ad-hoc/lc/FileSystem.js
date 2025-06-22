var FileSystem = function () {
  this.trie = new Trie();
};

/**
 * @param {string} path
 * @param {number} value
 * @return {boolean}
 */
FileSystem.prototype.createPath = function (path, value) {
  this.trie.addPath(path.split("/").slice(1), value);
};

/**
 * @param {string} path
 * @return {number}
 */
FileSystem.prototype.get = function (path) {
  return this.trie.getPath(path.split("/").slice(1));
};

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.createPath(path,value)
 * var param_2 = obj.get(path)
 */

class TrieNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode("", null);
  }
  addPath(paths, val) {
    let node = this.root;
    // Loop till parent
    for (let i = 0; i < paths.length - 1; i++) {
      const path = paths[i];
      // If parent does not exist in trie
      if (!node.children.has(path)) {
        return false;
      }
      node = node.children.get(path);
    }
    const lastPath = paths[paths.length - 1];

    // If path already exist in trie
    if (node.children.has(lastPath)) {
      return false;
    }
    node.children.set(lastPath, new TrieNode(lastPath, val));
    return true;
  }

  getPath(paths) {
    let node = this.root;
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      // not found
      if (!node.children.has(path)) {
        return -1;
      }
      node = node.children.get(path);
    }
    return node.val;
  }
}
