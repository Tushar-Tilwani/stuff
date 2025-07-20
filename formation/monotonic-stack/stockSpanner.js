var StockSpanner = function () {
  this.stack = [[Infinity, -1]];
  this.index = 0;
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  this.index++;
  const { stack, index } = this;
  while (stack.length > 0 && stack[stack.length - 1][0] < price) {
    stack.pop();
  }
  const [, lastIndex] = stack[stack.length - 1];
  stack.push([price, index]);
  return index - lastIndex;
};
