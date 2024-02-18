const sortFn = (a, b) => a - b;

function sweetAndSavory(dishes, target) {
  // Write your code here.
  const sortedDishes = dishes.sort(sortFn);
  let start = 0;
  let end = sortedDishes.length - 1;
  let sum = -Infinity;
  let result = [0, 0];
  while (start < end) {
    if (!(sortedDishes[start] < 0 && sortedDishes[end] > 0)) {
      break;
    }

    const tempSum = sortedDishes[start] + sortedDishes[end];
    if (tempSum == target) {
      return [sortedDishes[start], sortedDishes[end]];
    }
    if (tempSum > target) {
      end--;
      continue;
    }
    sum = Math.max(sum, tempSum);
    result = [sortedDishes[start], sortedDishes[end]];
    start++;
  }
  return result;
}

// Do not edit the line below.
exports.sweetAndSavory = sweetAndSavory;
