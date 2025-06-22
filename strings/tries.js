function prefixDfs(node, prefixArr, index, path, result) {
  if (Object.keys(node.children).length === 0) {
    return;
  }

  if (index === prefixArr.length) {
    path.forEach(element => {
      result.push(element);
    });
    return;
  }

  const childNode = node.children[prefixArr[index]];
  if (childNode) {
    path.push(childNode);
    prefixDfs(childNode, prefixArr, index + 1, path, result);
    path.pop();
  }
}

function allDfsPaths(node, path, result) {
  const children = Object.values(node.children);
  if (children.length === 0 || node.isWord) {
    result.push(path.slice(0));
  }
  for (const childNode of children) {
    path.push(childNode.char);
    allDfsPaths(childNode, path, result);
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
  findPrefix(prefix) {
    const prefixArr = prefix.split("");

    const prefixResult = [];
    prefixDfs(this.root, prefixArr, 0, [], prefixResult);
    if (prefixResult.length === 0) {
      return [];
    }

    const result = [];
    allDfsPaths(prefixResult[prefixResult.length - 1], [], result);
    return result.map(val => `${prefix}${val.join("")}`);
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

const trie = new Trie(["abc", "abs", "cfg", "abh", "abhh", "a"]);
console.log(trie.findPrefix("ab"));
