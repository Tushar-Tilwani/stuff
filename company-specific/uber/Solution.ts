class Solution {
  weightValues: number[];
  constructor(w: number[]) {
    let sum = 0;
    const weightValues = w.map((v) => {
      sum += v;
      return sum;
    });
    this.weightValues = [0, ...weightValues];
  }

  pickIndex(): number {
    const sum = this.weightValues[this.weightValues.length - 1];
    const rand = Math.floor(Math.random() * sum);
    console.log(this.weightValues, rand, this.bSearch(rand));
    return this.bSearch(rand);
  }

  bSearch(num: number): number {
    let start = 0;
    let end = this.weightValues.length - 1;
    while (start <= end) {
      const mid = Math.floor((end - start) / 2) + start;
      const midVal = this.weightValues[mid];
      if (midVal <= num) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return end;
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
