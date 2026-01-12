class Solution {
  indexMap: Map<number, number>;
  values: number[];
  constructor(weights: number[]) {
    this.indexMap = new Map();
    this.values = [];

    for (let i = 0; i < weights.length; i++) {
      this.values[i] = weights[i] + (this.values[i - 1] ?? 0);
    }
  }

  pickIndex(): number {
    const random = Math.floor(Math.random() * this.values[this.values.length - 1]);
    const values = this.values;
    let start = 0;
    let end = values.length - 1;
    while (start <= end) {
      const mid = Math.floor((end - start) / 2) + start;
      if (random === values[mid]) {
        return mid;
      }
      if (random < values[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return start;
  }
}
/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
