/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
  let result = numBottles;
  let emptyBottles = numBottles;
  while (emptyBottles > numExchange) {
    let bottleDrank = Math.floor(emptyBottles / numExchange);
    let bottleLeft = emptyBottles % numExchange;
    emptyBottles = bottleDrank + bottleLeft;
    result += bottleDrank;
  }

  return result;
};
