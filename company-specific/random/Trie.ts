class Trie {
  char: string | null;
  isWord: boolean;
  children: Map<string, Trie>;

  constructor() {
    this.char = null;
    this.isWord = false;
    this.children = new Map();
  }

  insert(word: string): void {
    const chars = word.split("");
    let parent: Trie = this;
    for (const char of chars) {
      const node = parent.children.get(char) ?? new Trie();
      node.char = char;
      parent.children.set(char, node);
      parent = node;
    }
    parent.isWord = true;
  }

  search(word: string): boolean {
    return !!this.getNode(word)?.isWord;
  }

  startsWith(prefix: string): boolean {
    return !!this.getNode(prefix);
  }

  getNode(prefix: string): Trie | undefined {
    let node: Trie | undefined = this;
    const chars = prefix.split("");
    for (const char of chars) {
      node = node?.children.get(char);
      if (!node) {
        return;
      }
    }
    return node;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
