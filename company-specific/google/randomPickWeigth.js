/**
 * @param {number[]} w
 */
var Solution = function (w) {
  const arr = w.reduce((acc, v, i) => {
    acc.push((acc[acc.length - 1] ?? 0) + v);
    return acc;
  }, []);
  this.arr = arr;
  this.max = arr[arr.length - 1];
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  const random = getRandomInRange(0, this.max - 1);
  return this.arr.findIndex((v) => random < v);
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
