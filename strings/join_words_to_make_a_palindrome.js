/*
 * Complete the join_words_to_make_a_palindrome function below.
 */
function join_words_to_make_a_palindrome(words) {
  /*
   * Write your code here.
   */
  const trie = new Trie(words);
  const result = trie.findPalidromePairs();
  if (result.length === 0) {
    return ["NOTFOUND", "DNUOFTON"];
  }
  return result;
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
    this.words = words;
    for (const word of words) {
      this.addWord(word);
    }
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

  /**
   * Finds the prefix and returns the leftover strings
   */
  findPalindromicPrefix(chars) {
    let node = this.root;
    for (const char of chars) {
      if (!node.children[char]) {
        break;
      }
      node = node.children[char];
    }
    const leftOverResult = [];
    dfs(node, leftOverResult);
    return leftOverResult
      .filter(leftOverChars => isPalindrome(leftOverChars))
      .map(leftOverChars => [...chars, ...leftOverChars].join(""));
  }

  findPalidromePairs() {
    const result = [];
    for (const word of this.words) {
      const chars = word.split("").reverse();
      const palindromePairWords = this.findPalindromicPrefix(chars);
      for (const pairWord of palindromePairWords) {
        result.push([word, pairWord]);
      }
    }
    return result;
  }
}

function dfs(node, result, path = []) {
  if (node.isWord || Object.values(node.children).length === 0) {
    result.push(path.slice(0));
  }
  const children = Object.values(node.children);
  for (const childNode of children) {
    path.push(childNode.char);
    dfs(childNode, result, path);
    path.pop();
  }
}

function isPalindrome(strArr) {
  const len = strArr.length;
  const mid = Math.floor(len / 2);
  for (let i = 0; i < mid; i++) {
    if (strArr[len - 1 - i] !== strArr[i]) {
      return false;
    }
  }
  return true;
}

const words = ["car", "racee", "dam", "ma", "aba"];
// const words = ["ant", "dog", "monkey"];

console.log(join_words_to_make_a_palindrome(words));
