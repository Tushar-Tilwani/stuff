class ZigzagIterator {
  arrays: [number[], number][];
  currVector: number;
  constructor(...args: number[][]) {
    this.arrays = [];
    for (const arr of args) {
      if (arr.length > 0) {
        this.arrays.push([arr, 0]);
      }
    }
    this.currVector = 0;
  }

  next(): number {
    if (this.arrays.length === 0) {
      return -1;
    }
    const [currentArray, currentArrayIndex] = this.arrays[this.currVector];
    const currValue = currentArray[currentArrayIndex];
    if (currentArrayIndex + 1 === currentArray.length) {
      this.arrays.splice(this.currVector, 1);
    } else {
      this.arrays[this.currVector][1] += 1;
    }

    this.currVector += 1;
    if (this.currVector === this.arrays.length) {
      this.currVector = 0;
    }

    return currValue;
  }

  hasNext(): boolean {
    return this.arrays.length !== 0;
  }
}

/**
 * Your ZigzagIterator will be instantiated and called as such:
 * var i = new ZigzagIterator(v1, v2), a = [];
 * while (i.hasNext()) a.push(i.next());
 */
