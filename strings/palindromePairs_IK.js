/*
 * Complete the join_words_to_make_a_palindrome function below.
 */
function join_words_to_make_a_palindrome(words) {
  /*
   * Write your code here.
   */
  const reverseWords = words.map(word =>
    word
      .split("")
      .reverse()
      .join("")
  );
  const trie1 = new Trie(words);
  const trie2 = new Trie(reverseWords);

  const trie1Results = trie1.findPartialPalidromePairs();
  const trie2Results = trie2
    .findPartialPalidromePairs()
    .map(([word1, word2]) => [
      word2
        .split("")
        .reverse()
        .join(""),
      word1
        .split("")
        .reverse()
        .join("")
    ]);

  const totalResults = [...trie2Results, ...trie1Results].map(
    ([word1, word2]) => `${word1},${word2}`
  );

  const result = new Set(totalResults);

  if (result.size === 0) {
    return ["NOTFOUND", "DNUOFTON"];
  }

  const answer = Array.from(result.values()).map(str => str.split(","));
  return answer[1] || answer[0];
}

const END_CHAR = "$";

class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = new Map();
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
      const children = node.children;
      if (!children.has(char)) {
        children.set(char, new TrieNode(char));
      }
      node = children.get(char);
    }
    node.children.set(END_CHAR, new TrieNode(END_CHAR));
  }

  findPartialPalidromePairs() {
    const result = [];
    for (const word of this.words) {
      const foundResult = dfsLeftOver(this.root, 0, word.split("").reverse());
      if (foundResult !== null) {
        if (foundResult.length === word.length) {
          result.push([foundResult, word].sort());
        } else {
          result.push([foundResult, word]);
        }
      }
    }
    return result;
  }
}

function dfsLeftOver(node, index, word) {
  if (node.children.has(END_CHAR)) {
    const leftOver = word.slice(index, word.length);
    if (isPalindrome(leftOver)) {
      return word.slice(0, index).join("");
    }
    return null;
  }
  const char = word[index];
  if (!node.children.has(char)) {
    return null;
  }
  return dfsLeftOver(node.children.get(char), index + 1, word);
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

const arr = ["dog", "god", "dam", "car", "racee", "ma", "cat"];

console.log(join_words_to_make_a_palindrome(arr));
