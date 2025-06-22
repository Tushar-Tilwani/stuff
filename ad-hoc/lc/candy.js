/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
  const result = [];

  for (let i = 0; i < ratings.length; i++) {
    result[i] = 1;
  }

  // Left Sweep
  for (let i = 0; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1] && !(result[i] > result[i - 1])) {
      result[i] = result[i - 1] + 1;
    }
  }

  // right Sweep
  for (let i = ratings.length - 1; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1] && !(result[i] > result[i + 1])) {
      result[i] = result[i + 1] + 1;
    }
  }

  console.log(result);

  return result.reduce((acc, val) => acc + val);
};

console.log(candy([1, 2, 87, 87, 87, 2, 1]));
