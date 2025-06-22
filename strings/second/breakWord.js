function dfs(node, path, strArr, index, result) {
  if (node.isWord) {
    result.push(strArr.slice(index, strArr.length));
  }

  if (index === strArr.length) {
    return result;
  }

  const child = node.children[strArr[index]];
  if (child) {
    path.push(child.char);
    dfs(child, path, strArr, index + 1, result);
    path.pop();
  } else {
    result.push(strArr.slice(index, strArr.length));
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
  findLeftOver(strArr) {
    const result = [];
    dfs(this.root, [], strArr, 0, result);
    return result;
  }
}

// https://leetcode.com/problems/word-break/
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

function wordBreak(s, wordDict) {
  const trie = new Trie(wordDict);
  const strArr = s.split("");
  return helper(strArr, trie);
}

function helper(strArr, trie) {
  const leftOvers = trie.findLeftOver(strArr);
  if (leftOvers.length === 0) {
    return true;
  }
  for (const leftover of leftOvers) {
    if (leftover.length !== strArr.length && helper(leftover, trie)) {
      return true;
    }
  }
  return false;
}

const s = "applepenapple",
  wordDict = ["apple", "pen"];
// const s = "catsandog",
//   wordDict = ["cats", "dog", "sand", "and", "cat"];
// const s = "leetcode",
//   wordDict = ["leet", "code"];
// console.log(wordBreak(s, wordDict));
console.log(wordBreak('a', []));
