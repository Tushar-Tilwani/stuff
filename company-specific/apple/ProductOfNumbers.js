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
  this.product.push((this.product[this.product.length - 1] ?? 1) * (num || 1));
  if (num === 0) {
    this.lastZero = this.nums.length - 1;
  }
};

/**
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function (k) {
  const end = this.product.length - 1;
  const kThIndex = end - k;
  if (kThIndex <= this.lastZero) {
    return 0;
  }
  return this.product[end] / this.product[kThIndex];
};

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */
