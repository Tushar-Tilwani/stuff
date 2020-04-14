function boggle_solver(dictionary, mat) {
  // Write your code here
  const trie = new Trie(dictionary);
  const result = [];
  const MAX_ROW = mat.length;
  const MAX_COL = mat[0].length;

  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      const visited = getVisited(mat);
      visited[i][j] = true;
      dfs(mat, i, j, trie.rootNode, [], getVisited(mat), trie, result);
    }
  }

  return result;
}
function dfs(mat, row, col, trieNode, path, visited, trie, result) {
  const char = mat[row][col];
  if (!trieNode.children || !trieNode.children.has(char)) {
    return;
  }

  path.push(char);
  const newTrieNode = trieNode.children.get(char);
  // console.log(trie, newTrieNode, path);
  if (newTrieNode.isWord) {
    result.push(path.join(""));
    trie.removeWord(path);
    newTrieNode.isWord = false;
    // console.log(trie.rootNode);
  }

  for (const [currRow, currCol] of getNeighbours(mat, row, col)) {
    if (visited[currRow][currCol]) {
      continue;
    }
    visited[currRow][currCol] = true;
    dfs(mat, currRow, currCol, newTrieNode, path, visited, trie, result);
    visited[currRow][currCol] = false;
  }
  path.pop();
}

class TrieNode {
  constructor(char) {
    this.children = new Map();
    this.char = char;
    this.isWord = false;
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
    let node = this.rootNode;
    const chars = word.split("");
    for (const char of chars) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode(char));
      }
      node = node.children.get(char);
    }
    node.isWord = true;
  }

  removeWord(chars) {
    let node = this.rootNode;
    let parentNode = this.rootNode;
    let deleteFromChar = chars[0];

    for (const char of chars) {
      if (!node.children.has(char)) {
        return false;
      }
      if (node.children.size > 1) {
        parentNode = node;
        deleteFromChar = char;
      }
      node = node.children.get(char);
    }

    if (!node.isWord) {
      return false;
    }

    if (node.children.size > 0) {
      node.isWord = false;
      return true;
    }

    node.isWord = false;
    parentNode.children.delete(deleteFromChar);
    return true;
  }
}

function recursiveDelete(node) {
  if (!node.children) {
    return;
  }
  for (const child of node.children) {
    recursiveDelete(child);
    delete child;
  }
  delete node.children;
}

function getNeighbours(mat, row, col) {
  const MAX_ROW = mat.length;
  const MAX_COL = mat[0].length;
  const result = [];

  if (col - 1 >= 0) {
    if (row + 1 < MAX_ROW) {
      result.push([row + 1, col - 1]);
    }

    result.push([row, col - 1]);

    if (row - 1 >= 0) {
      result.push([row - 1, col - 1]);
    }
  }

  if (row + 1 < MAX_ROW) {
    result.push([row + 1, col]);
  }

  if (row - 1 >= 0) {
    result.push([row - 1, col]);
  }

  if (col + 1 < MAX_COL) {
    if (row + 1 < MAX_ROW) {
      result.push([row + 1, col + 1]);
    }

    result.push([row, col + 1]);

    if (row - 1 >= 0) {
      result.push([row - 1, col + 1]);
    }
  }
  return result;
}

function getVisited(mat) {
  const MAX_ROW = mat.length;
  const MAX_COL = mat[0].length;
  const visited = [];

  for (let i = 0; i < MAX_ROW; i++) {
    visited[i] = [];
    for (let j = 0; j < MAX_COL; j++) {
      visited[i].push(false);
    }
  }
  return visited;
}

var mat = ["bsh", "tee", "arh"];
var dict = ["bst", "heap", "tree"];

// dict = ["hat", "world"];
// mat = ["aaa", "hat", "ccc"];

// dict = ["bsg", "bstaaaa", "bssg"];

// dict = ["abc", "dfg", "lmn"];
// const trie = new Trie(dict);

console.log(boggle_solver(dict, mat));

// console.log(trie.removeWord("abc"), trie.rootNode);
