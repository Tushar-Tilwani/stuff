// A TreeMap-like structure with O(log n) expected time for insert/delete/min/max.
//
// - Uses a Treap (binary search tree + heap by random priority)
// - Keys are ordered via a user-provided comparator
// - Supports: set, get, has, delete, min, max, size, isEmpty

type Comparator<K> = (a: K, b: K) => number;

class TreapNode<K, V> {
  key: K;
  value: V;
  priority: number; // heap priority
  left: TreapNode<K, V> | null = null;
  right: TreapNode<K, V> | null = null;

  constructor(key: K, value: V, priority: number) {
    this.key = key;
    this.value = value;
    this.priority = priority;
  }
}

class TreeMap<K, V> {
  private root: TreapNode<K, V> | null = null;
  private cmp: Comparator<K>;
  private _size = 0;

  constructor(cmp: Comparator<K>) {
    this.cmp = cmp;
  }

  get size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  /** Get value for key, or undefined if not present */
  get(key: K): V | undefined {
    let cur = this.root;
    while (cur) {
      const c = this.cmp(key, cur.key);
      if (c === 0) return cur.value;
      if (c < 0) cur = cur.left;
      else cur = cur.right;
    }
    return undefined;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  /** Insert or update a key. Returns the old value if replaced. */
  set(key: K, value: V): V | undefined {
    let oldValue: V | undefined = undefined;
    const priority = Math.random(); // random priority for treap

    const insertRec = (node: TreapNode<K, V> | null): TreapNode<K, V> => {
      if (!node) {
        this._size++;
        return new TreapNode(key, value, priority);
      }

      const c = this.cmp(key, node.key);
      if (c === 0) {
        // Replace value
        oldValue = node.value;
        node.value = value;
        return node;
      } else if (c < 0) {
        node.left = insertRec(node.left);
        if (node.left && node.left.priority < node.priority) {
          node = this.rotateRight(node);
        }
      } else {
        node.right = insertRec(node.right);
        if (node.right && node.right.priority < node.priority) {
          node = this.rotateLeft(node);
        }
      }
      return node;
    };

    this.root = insertRec(this.root);
    return oldValue;
  }

  /** Delete key. Returns true if removed, false if not found. */
  delete(key: K): boolean {
    let removed = false;

    const deleteRec = (node: TreapNode<K, V> | null): TreapNode<K, V> | null => {
      if (!node) return null;

      const c = this.cmp(key, node.key);
      if (c < 0) {
        node.left = deleteRec(node.left);
      } else if (c > 0) {
        node.right = deleteRec(node.right);
      } else {
        // Found the node to remove
        removed = true;
        this._size--;

        // If leaf or single child, just return the child
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // Both children exist: rotate the child with smaller priority up
        if (node.left.priority < node.right.priority) {
          node = this.rotateRight(node);
          node.right = deleteRec(node.right);
        } else {
          node = this.rotateLeft(node);
          node.left = deleteRec(node.left);
        }
      }
      return node;
    };

    this.root = deleteRec(this.root);
    return removed;
  }

  /** Return the smallest key/value pair, or undefined if empty */
  min(): { key: K; value: V } | undefined {
    if (!this.root) return undefined;
    let cur = this.root;
    while (cur.left) cur = cur.left;
    return { key: cur.key, value: cur.value };
  }

  /** Return the largest key/value pair, or undefined if empty */
  max(): { key: K; value: V } | undefined {
    if (!this.root) return undefined;
    let cur = this.root;
    while (cur.right) cur = cur.right;
    return { key: cur.key, value: cur.value };
  }

  // ----- Internal rotations -----

  private rotateRight(node: TreapNode<K, V>): TreapNode<K, V> {
    const newRoot = node.left as TreapNode<K, V>;
    node.left = newRoot.right;
    newRoot.right = node;
    return newRoot;
  }

  private rotateLeft(node: TreapNode<K, V>): TreapNode<K, V> {
    const newRoot = node.right as TreapNode<K, V>;
    node.right = newRoot.left;
    newRoot.left = node;
    return newRoot;
  }
}

function longestSubarray(nums: number[], limit: number): number {
  let result = 0;
  let left = 0;
  let right = 0;
  const treeset = new TreeMap<number, number>((a, b) => a - b);
  treeset.set(nums[left], 1);
  while (right < nums.length && left <= right) {
    const min = treeset.min()?.key as number;
    const max = treeset.max()?.key as number;
    if (max - min <= limit) {
      result = Math.max(result, right - left + 1);
      right++;
      treeset.set(nums[right], (treeset.get(nums[right]) ?? 0) + 1);
    } else {
      treeset.set(nums[left], (treeset.get(nums[left]) ?? 0) - 1);
      if (treeset.get(nums[left]) === 0) {
        treeset.delete(nums[left]);
      }
      left++;
    }
  }

  return result;
}
