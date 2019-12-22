/*
 * Complete the 'minimum_coins' function below.
 *
 * The function accepts INTEGER ARRAY and INTEGER as parameter.
 * Return INTEGER.
 */
function minimum_coins(coins, value) {
  // Write your code here
  const table = [0];

  for (let i = 1; i <= value; i++) {
    let localMin = Infinity;
    for (let coin of coins) {
      const subProblemIndex = i - coin;

      if (subProblemIndex < 0) {
        continue;
      }

      localMin = Math.min(localMin, table[subProblemIndex]);
    }

    table[i] = localMin + 1;
  }

  return table[value];
}


console.log(minimum_coins([3,5], 8));