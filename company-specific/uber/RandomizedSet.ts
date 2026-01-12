class RandomizedSet {
  valueMap: Map<number, number>;
  values: number[];
  constructor() {
    this.valueMap = new Map<number, number>();
    this.values = [];
  }

  insert(val: number): boolean {
    if (this.valueMap.has(val)) {
      return false;
    }
    this.valueMap.set(val, this.values.length);
    this.values.push(val);
    return true;
  }

  remove(val: number): boolean {
    if (!this.valueMap.has(val)) {
      return false;
    }
    const lastIndex = this.values.length - 1;
    const lastVal = this.values[lastIndex];
    const valIndex = this.valueMap.get(val)!;
    this.values[valIndex] = lastVal;
    this.valueMap.set(lastVal, valIndex);

    // delete
    this.valueMap.delete(val);
    this.values.pop();
    return true;
  }

  getRandom(): number {
    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex];
  }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
