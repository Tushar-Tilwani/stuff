type Comparator1<K> = (a: K, b: K) => number;

class TreeNode1<K, V> {
  key: K;
  value: V;
  priority: number;
  left: TreeNode1<K, V> | null = null;
  right: TreeNode1<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.priority = Math.random(); // heap priority
  }
}

export class TreeMap1<K, V> {
  private root: TreeNode1<K, V> | null = null;
  private compare: Comparator1<K>;

  constructor(compare?: Comparator1<K>) {
    this.compare = compare ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  // ---------- GET ----------
  get(key: K): V | undefined {
    let current = this.root;
    while (current) {
      const cmp = this.compare(key, current.key);
      if (cmp === 0) return current.value;
      current = cmp < 0 ? current.left : current.right;
    }
    return undefined;
  }

  // ---------- SET ----------
  set(key: K, value: V): void {
    this.root = this.insert(this.root, key, value);
  }

  private insert(node: TreeNode1<K, V> | null, key: K, value: V): TreeNode1<K, V> {
    if (!node) return new TreeNode1(key, value);

    const cmp = this.compare(key, node.key);

    if (cmp < 0) {
      node.left = this.insert(node.left, key, value);
      if (node.left!.priority > node.priority) {
        node = this.rotateRight(node);
      }
    } else if (cmp > 0) {
      node.right = this.insert(node.right, key, value);
      if (node.right!.priority > node.priority) {
        node = this.rotateLeft(node);
      }
    } else {
      node.value = value;
    }

    return node;
  }

  // ---------- DELETE ----------
  delete(key: K): void {
    this.root = this.remove(this.root, key);
  }

  private remove(node: TreeNode1<K, V> | null, key: K): TreeNode1<K, V> | null {
    if (!node) return null;

    const cmp = this.compare(key, node.key);

    if (cmp < 0) {
      node.left = this.remove(node.left, key);
    } else if (cmp > 0) {
      node.right = this.remove(node.right, key);
    } else {
      if (!node.left && !node.right) return null;

      if (!node.left) {
        node = this.rotateLeft(node);
      } else if (!node.right) {
        node = this.rotateRight(node);
      } else if (node.left.priority > node.right.priority) {
        node = this.rotateRight(node);
      } else {
        node = this.rotateLeft(node);
      }

      node = this.remove(node, key);
    }
    return node;
  }

  // ---------- MIN ----------
  min(): [K, V] | null {
    let node = this.root;
    if (!node) return null;
    while (node.left) node = node.left;
    return [node.key, node.value];
  }

  // ---------- MAX ----------
  max(): [K, V] | null {
    let node = this.root;
    if (!node) return null;
    while (node.right) node = node.right;
    return [node.key, node.value];
  }

  // ---------- ROTATIONS ----------
  private rotateRight(node: TreeNode1<K, V>): TreeNode1<K, V> {
    const left = node.left!;
    node.left = left.right;
    left.right = node;
    return left;
  }

  private rotateLeft(node: TreeNode1<K, V>): TreeNode1<K, V> {
    const right = node.right!;
    node.right = right.left;
    right.left = node;
    return right;
  }
}


function maxSlidingWindow(nums: number[], k: number): number[] {
  const treeMap = new TreeMap1<number, number>();
  const result = [];
  for (let i = 0; i < k; i++) {
    treeMap.set(nums[i], (treeMap.get(nums[i]) ?? 0) + 1);
  }
  for (let i = k; i < nums.length - k; i++) {
    const current = nums[i];
    const previous = nums[i - k];
    result.push(treeMap.max()![0]);
    treeMap.set(previous, treeMap.get(previous)! - 1);
    if (treeMap.get(previous) === 0) {
      treeMap.delete(previous);
    }
    treeMap.set(current, (treeMap.get(current) ?? 0) + 1);
  }
  return result;
}
