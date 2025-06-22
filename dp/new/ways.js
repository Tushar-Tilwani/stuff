const MOD = 10 ** 9 + 7;

/**
 * @param {string[]} pizza
 * @param {number} k
 * @return {number}
 */
var ways = function (pizza, k) {
  const pizzaArr = pizza.map((pizzaRow) => pizzaRow.split(""));
  const memo = new Map();
  return helper(pizzaArr, 0, 0, k - 1, memo);
};

function helper(pizza, startRow, startCol, k, memo) {
  const key = `${startRow}${startCol}${k}`;
  if (memo.has(key)) {
    return memo.get(key);
  }
  if (k === 0) {
    if (
      checkHasPizzaRowCol(
        pizza,
        startRow,
        startCol,
        pizza.length - 1,
        pizza[0].length - 1
      )
    ) {
      return 1;
    }
    return 0;
  }
  if (startRow >= pizza.length || startCol >= pizza[0].length) {
    return 0;
  }

  let result = 0;
  for (let endRow = startRow; endRow < pizza.length; endRow++) {
    if (
      checkHasPizzaRowCol(
        pizza,
        startRow,
        startCol,
        endRow,
        pizza[0].length - 1
      )
    ) {
      result += helper(pizza, endRow + 1, startCol, k - 1, memo);
    }
  }

  for (let endCol = startCol; endCol < pizza[0].length; endCol++) {
    if (
      checkHasPizzaRowCol(pizza, startRow, startCol, pizza.length - 1, endCol)
    ) {
      result += helper(pizza, startRow, endCol + 1, k - 1, memo);
    }
  }

  memo.set(key, result);
  return result;
}

function checkHasPizzaRowCol(pizza, startRow, startCol, endRow, endCol) {
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (pizza[row][col] === "A") {
        return true;
      }
    }
  }

  return false;
}
