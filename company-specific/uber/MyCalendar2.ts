class BSTNode {
  val: [number, number];
  left?: BSTNode;
  right?: BSTNode;
  constructor(val: [number, number], left?: BSTNode, right?: BSTNode) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class MyCalendarTwo {
  root?: BSTNode;
  overlapRoot?: BSTNode;

  constructor() {
    this.root = undefined;
    this.overlapRoot = undefined;
  }

  book(startTime: number, endTime: number): boolean {
    if (!this.root) {
      this.root = new BSTNode([startTime, endTime]);
      return true;
    }
    const overlap = this.insert(this.root, startTime, endTime);
    console.log(this.overlapRoot, overlap);
    if (overlap) {
      if (!this.overlapRoot) {
        this.overlapRoot = new BSTNode(overlap);
      } else {
        const l = this.insert(this.overlapRoot, ...overlap);
        console.log("dede", l);
        return !l;
      }
    }
    return true;
  }

  insert(node: BSTNode, startTime: number, endTime: number): [number, number] | null {
    const [nodeStart, nodeEnd] = node.val;

    if (endTime <= nodeStart) {
      // Meeting ended before this one go left
      if (node.left) {
        return this.insert(node.left, startTime, endTime);
      }
      node.left = new BSTNode([startTime, endTime]);
      return null;
    }
    if (startTime >= nodeEnd) {
      if (node.right) {
        return this.insert(node.right, startTime, endTime);
      }
      node.right = new BSTNode([startTime, endTime]);
      return null;
    }

    return [Math.max(startTime, nodeStart), Math.min(endTime, nodeEnd)];
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
