function swap(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function random(min: number, max: number) {
  return min + Math.floor((max - min + 1) * Math.random());
}

class RandomizedCollection {
  map: Map<number, Set<number>>;
  values: number[];
  constructor() {
    this.map = new Map();
    this.values = [];
  }

  _getRemoveIndex(val: number): number {
    const removeIndexSet = this.map.get(val) ?? new Set();
    // O(1) - because values() returns an iterator
    const removeIndex = removeIndexSet.values().next().value;
    removeIndexSet.delete(removeIndex as number);
    if (removeIndexSet.size > 0) {
      this.map.set(val, removeIndexSet);
    } else {
      this.map.delete(val);
    }
    return removeIndex ?? -1;
  }

  _lastIndexRemove(removeIndex: number): number {
    const lastIndex = this.values.length - 1;
    const lastValue = this.values[lastIndex];
    const lastValueSet = this.map.get(lastValue) ?? new Set();
    lastValueSet.delete(lastIndex);
    lastValueSet.add(removeIndex);
    this.map.set(lastValue, lastValueSet);
    swap(this.values, removeIndex, lastIndex);
    this.values.pop();

    return lastIndex;
  }

  insert(val: number): boolean {
    const result = !this.map.has(val);
    const indexSet = this.map.get(val) ?? new Set();
    indexSet.add(this.values.length + 1);
    this.map.set(val, indexSet);
    this.values.push(val);
    return result;
  }

  remove(val: number): boolean {
    if (!this.map.has(val)) {
      return false;
    }
    const removeIndex = this._getRemoveIndex(val);
    this._lastIndexRemove(removeIndex);
    return true;
  }

  getRandom(): number {
    return this.values[random(0, this.values.length - 1)];
  }
}

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = new RandomizedCollection()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
