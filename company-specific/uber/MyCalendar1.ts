class BSTNode1 {
  val: [number, number];
  left?: BSTNode1;
  right?: BSTNode1;
  constructor(val: [number, number], left?: BSTNode1, right?: BSTNode1) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class MyCalendar2 {
  root?: BSTNode1;
  constructor() {
    this.root = undefined;
  }

  book(startTime: number, endTime: number): boolean {
    if (!this.root) {
      this.root = new BSTNode1([startTime, endTime]);
      return true;
    }
    return this.insert(this.root, startTime, endTime);
  }

  insert(node: BSTNode1, startTime: number, endTime: number): boolean {
    const [nodeStart, nodeEnd] = node.val;

    if (endTime <= nodeStart) {
      // Meeting ended before this one go left
      if (node.left) {
        return this.insert(node.left, startTime, endTime);
      }
      node.left = new BSTNode1([startTime, endTime]);
      return true;
    }
    if (startTime >= nodeEnd) {
      if (node.right) {
        return this.insert(node.right, startTime, endTime);
      }
      node.right = new BSTNode1([startTime, endTime]);
      return true;
    }
    return false;
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
