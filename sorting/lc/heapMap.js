function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  class Heap {
    constructor(comparator) {
      this.arr = [null];
      this.comparator = comparator || ((a, b) => a < b);
      this.map = new Map();
    }
  
    add(val) {
      this.arr.push(val);
      this.bubbleUp();
      return this.arr[1];
    }
  
    remove(val) {
      const vals = [];
      let top = this.extractTop();
  
      while (top !== val && top !== null) {
        vals.push(top);
        top = this.extractTop();
      }
  
      while (vals.length > 0) {
        this.add(vals.pop());
      }
    }
  
    bubbleUp() {
      let childIndex = this.arr.length - 1;
      let parentIndex;
      while (true) {
        parentIndex = Math.floor(childIndex / 2);
        if (
          parentIndex < 1 ||
          this.comparator(this.arr[parentIndex], this.arr[childIndex])
        ) {
          break;
        }
  
        swap(this.arr, childIndex, parentIndex);
        childIndex = parentIndex;
      }
      return childIndex;
    }
  
    bubbleDown() {
      swap(this.arr, 1, this.arr.length - 1);
      this.arr.pop();
  
      const len = this.arr.length;
      let parentIndex = 1;
  
      while (true) {
        const childIndex1 = 2 * parentIndex;
        const childIndex2 = 2 * parentIndex + 1;
        let childIndex;
        if (childIndex1 >= len) {
          // If parent does not have any child
          break;
        }
        if (childIndex2 < len) {
          // If parent has both children
          childIndex = this.comparator(
            this.arr[childIndex1],
            this.arr[childIndex2]
          )
            ? childIndex1
            : childIndex2;
        } else {
          // If parent has one children
          childIndex = childIndex1;
        }
  
        // Parent is in the right position
        if (this.comparator(this.arr[parentIndex], this.arr[childIndex])) {
          break;
        }
  
        // If parent is larger than child. Means we need to swap.
        swap(this.arr, parentIndex, childIndex);
  
        parentIndex = childIndex;
      }
      return parentIndex;
    }
  
    extractTop() {
      if (this.arr.length === 1) {
        return null;
      }
  
      // Remove top element
      const top = this.arr[1];
      this.bubbleDown();
      return top;
    }
  
    peekTop() {
      if (this.arr.length === 1) {
        return null;
      }
      return this.arr[1];
    }
  }