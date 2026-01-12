class Trie {
  children: Map<string, Trie>;
  currentChar: string;
  constructor(currentChar: string) {
    this.currentChar = currentChar;
    this.children = new Map<string, Trie>();
  }
  addWord(word: string) {
    const chars = word.split("");
    let children = this.children;
    for (const char of chars) {
      const node = children.get(char) ?? new Trie(char);
      children.set(char, node);
      children = node.children;
    }
  }
}

function longestCommonPrefix(strs: string[]): string {
  const root = new Trie("*");
  for (const word of strs) {
    if (word.length === 0) {
      return "";
    }
    root.addWord(word);
  }
  const result: string[] = [];
  let node: Trie | undefined = root;
  while (node) {
    if (node.children.size !== 1) {
      break;
    }
    result.push(node.currentChar);
    node = node.children.values().next().value;
  }
  return result.slice(1).join("");
}
