type Comparator<K> = (a: K, b: K) => number;

class TreeNode1<K, V> {
  key: K;
  value: V;
  left: TreeNode1<K, V> | null = null;
  right: TreeNode1<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class TreeMap1<K, V> {
  private root: TreeNode1<K, V> | null = null;
  private compare: Comparator<K>;

  constructor(compare: Comparator<K>) {
    this.compare = compare;
  }

  // Insert or update key
  set(key: K, value: V): void {
    this.root = this.insert(this.root, key, value);
  }

  private insert(node: TreeNode1<K, V> | null, key: K, value: V): TreeNode1<K, V> {
    if (!node) {
      return new TreeNode1(key, value);
    }

    const cmp = this.compare(key, node.key);

    if (cmp === 0) {
      // Update existing
      node.value = value;
    } else if (cmp < 0) {
      node.left = this.insert(node.left, key, value);
    } else {
      node.right = this.insert(node.right, key, value);
    }

    return node;
  }

  // Get value by key (undefined if missing)
  get(key: K): V | undefined {
    let node = this.root;

    while (node) {
      const cmp = this.compare(key, node.key);
      if (cmp === 0) return node.value;
      if (cmp < 0) node = node.left;
      else node = node.right;
    }

    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * floorKey(x): largest key <= x
   * - For your case: keys [5, 10, 20], floorKey(15) -> 10
   */
  floorKey(x: K): K | undefined {
    let node = this.root;
    let candidate: TreeNode1<K, V> | null = null;

    while (node) {
      const cmp = this.compare(x, node.key);

      if (cmp === 0) {
        // Exact match → this is the floor
        return node.key;
      }

      if (cmp < 0) {
        // x < node.key → floor must be in the left subtree
        node = node.left;
      } else {
        // x > node.key → this node is a candidate, go right to try a larger one
        candidate = node;
        node = node.right;
      }
    }

    return candidate?.key;
  }

  /**
   * ceilKey(x): smallest key >= x
   * - For keys [5, 10, 20], ceilKey(15) -> 20
   * - ceilKey(10) -> 10
   */
  ceilKey(x: K): K | undefined {
    let node = this.root;
    let candidate: TreeNode1<K, V> | null = null;

    while (node) {
      const cmp = this.compare(x, node.key);

      if (cmp === 0) {
        // Exact match → this is the ceil
        return node.key;
      }

      if (cmp < 0) {
        // x < node.key → this node is a candidate, go left to try a smaller one
        candidate = node;
        node = node.left;
      } else {
        // x > node.key → ceil must be in the right subtree
        node = node.right;
      }
    }

    return candidate?.key;
  }

  // Optional: minimum key in the map
  firstKey(): K | undefined {
    let node = this.root;
    if (!node) return undefined;
    while (node.left) node = node.left;
    return node.key;
  }

  // Optional: maximum key in the map
  lastKey(): K | undefined {
    let node = this.root;
    if (!node) return undefined;
    while (node.right) node = node.right;
    return node.key;
  }
}

class HitCounter {
  map: TreeMap1<number, number>;
  count: number;
  constructor() {
    this.map = new TreeMap1<number, number>((a, b) => a - b);
    this.count = 0;
  }

  hit(timestamp: number): void {
    this.count += 1;
    this.map.set(timestamp, this.count);
  }

  getHits(timestamp: number): number {
    const prevTimestamp = timestamp - 300;
    const currentKey = this.map.floorKey(timestamp) as number;
    const prevKey = this.map.floorKey(prevTimestamp) as number;
    return (this.map.get(currentKey) ?? 0) - (this.map.get(prevKey) ?? 0);
  }
}

/**
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */
