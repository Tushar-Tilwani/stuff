

var StockSpanner = function () {
    this.stack = [[Infinity, -1]];
    this.index = 0;
};

/** 
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
    const { stack, index } = this;
    while (stack.length > 1 && stack[stack.length - 1][0] < price) {
        stack.pop();
    }
    const [, lastIndex] = stack[stack.length - 1];
    const result = index - lastIndex;
    stack.push([price, index]);
    this.index++;
    return result;
};

/** 
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */