var ProductOfNumbers = function () {
  this.nums = [];
  this.product = [1];
  this.lastZero = -1;
};

/**
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function (num) {
  this.nums.push(num);
};

/**
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function (k) {
  return this.nums
    .slice(this.nums.length - k)
    .reduce((acc, num) => acc * num, 1);
};

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */
