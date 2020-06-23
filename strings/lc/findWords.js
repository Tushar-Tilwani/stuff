/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  const MAX_ROW = board.length;
  const MAX_COL = board[0].length;
  const trie = new Trie(words);
  const result = [];

  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      dfs(board, i, j, [], getVisitedArray(board), trie.root, result);
    }
  }
  return Array.from(new Set(result).values());
};

function getVisitedArray(board) {
  const MAX_ROW = board.length;
  const MAX_COL = board[0].length;
  const visited = [];

  for (let i = 0; i < MAX_ROW; i++) {
    visited[i] = [];
    for (let j = 0; j < MAX_COL; j++) {
      visited[i].push(false);
    }
  }
  return visited;
}

function dfs(board, row, col, path, visited, trieNode, result) {
  const currentChar = board[row][col];

  if (!trieNode.chars.has(currentChar)) {
    return;
  }

  const childTrieNode = trieNode.chars.get(currentChar);
  const neighbors = getNeighbors(board, row, col);
  path.push(currentChar);
  if (childTrieNode.chars.has(END_CHAR)) {
    result.push(path.join(""));
  }

  for (const [nRow, nCol] of neighbors) {
    if (visited[nRow][nCol]) {
      continue;
    }
    visited[row][col] = true;
    dfs(board, nRow, nCol, path, visited, childTrieNode, result);
    visited[row][col] = false;
  }
  path.pop();
}

function getNeighbors(board, row, col) {
  const neighbors = [];
  const MAX_ROW = board.length;
  const MAX_COL = board[0].length;

  if (row - 1 >= 0) {
    neighbors.push([row - 1, col]);
  }

  if (col - 1 >= 0) {
    neighbors.push([row, col - 1]);
  }

  if (row + 1 < MAX_ROW) {
    neighbors.push([row + 1, col]);
  }

  if (col + 1 < MAX_COL) {
    neighbors.push([row, col + 1]);
  }
  return neighbors;
}

const END_CHAR = "$";
class TrieNode {
  constructor(val) {
    this.val = val;
    this.chars = new Map();
  }
}

class Trie {
  constructor(words) {
    this.root = new TrieNode(null);
    for (const word of words) {
      this.addWord(word);
    }
  }

  addWord(word) {
    const chars = word.split("");
    let node = this.root;
    for (const char of chars) {
      if (!node.chars.has(char)) {
        const newTrieNode = new TrieNode(char);
        node.chars.set(char, newTrieNode);
        node = newTrieNode;
      } else {
        node = node.chars.get(char);
      }
    }
    node.chars.set(END_CHAR, new TrieNode(END_CHAR));
  }
}

let b = [["a"]];
let w = ["a"];

b = [["a", "a"]];
w = ["aa"];

b = [
  ["a", "b"],
  ["c", "d"]
];
w = ["cdba"];
console.log(findWords(b, w));
