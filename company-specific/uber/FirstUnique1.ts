class DLNode {
  val: number;
  prev: DLNode | null = null;
  next: DLNode | null = null;

  constructor(val: number) {
    this.val = val;
  }
}

/**
 * FirstUnique data structure:
 *  - A doubly linked list storing values that appear exactly once.
 *  - A map from value → its node (only for unique values).
 *  - A set of values known to be duplicates (seen 2+ times).
 *
 * The head of the list always represents the *first* unique value.
 */
class FirstUnique {
  head: DLNode | null = null;          // first unique value
  tail: DLNode | null = null;          // last unique value
  nodeMap: Map<number, DLNode> = new Map(); 
  existingDuplicates: Set<number> = new Set(); 

  constructor(nums: number[]) {
    for (const num of nums) {
      this.add(num);
    }
  }

  /**
   * Return the first unique value or -1 if none exist.
   */
  showFirstUnique(): number {
    return this.head ? this.head.val : -1;
    // O(1)
  }

  /**
   * Append a new unique node at the end of the linked list.
   * Returns the created node.
   */
  _addNode(val: number): DLNode {
    const node = new DLNode(val);

    // Case 1: list is empty → node becomes head + tail.
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return node;
    }

    // Case 2: append to existing tail.
    const tail = this.tail!; // tail must exist if head exists
    tail.next = node;
    node.prev = tail;
    this.tail = node;

    return node;
  }

  /**
   * Remove a node from the linked list, handling:
   *  - removing head
   *  - removing tail
   *  - removing a middle node
   *
   * After removal, the node is fully detached.
   */
  _deleteNode(node: DLNode): void {
    const prev = node.prev;
    const next = node.next;

    // If node was head, move head forward.
    if (node === this.head) {
      this.head = next;
    }

    // If node was tail, move tail backward.
    if (node === this.tail) {
      this.tail = prev;
    }

    // Reconnect neighbors for middle removals.
    if (prev) prev.next = next;
    if (next) next.prev = prev;

    // Fully detach the node.
    node.prev = null;
    node.next = null;
  }

  /**
   * Add a new value to FirstUnique.
   *
   * - If value is already known duplicate → ignore.
   * - If value is currently unique → remove it (becomes duplicate).
   * - If value has never been seen → append to list.
   */
  add(value: number): void {
    // Already confirmed duplicate → nothing to do.
    if (this.existingDuplicates.has(value)) {
      return;
    }

    // Seen once before → remove its node & track as duplicate.
    if (this.nodeMap.has(value)) {
      const node = this.nodeMap.get(value)!;
      this._deleteNode(node);

      this.nodeMap.delete(value);
      this.existingDuplicates.add(value);
      return;
    }

    // First time seeing value → add to end of unique list.
    const node = this._addNode(value);
    this.nodeMap.set(value, node);
  }
}

/**
 * Usage:
 * const obj = new FirstUnique(nums);
 * obj.showFirstUnique();
 * obj.add(value);
 */
