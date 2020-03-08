/*
 * Complete the 'tower_of_hanoi' function below.
 *
 * The function accepts INTEGER as parameter.
 * Return 2D INTEGER ARRAY.
 */
function tower_of_hanoi(n) {
  // Write your code here
  const result = [];
  _helper(n, 1, 2, 3, result);
  return result;
}

function _helper(n, source, dest, aux, result) {
  if (n === 1) {
    result.push([source, dest]);
    return;
  }

  _helper(n - 1, source, aux, dest, result);
  result.push([source, dest]);
  _helper(n - 1, aux, dest, source, result);
  return result;
}

console.log(tower_of_hanoi(2));

// console.log([ [1, 2], [1, 3], [2, 3], [1, 2], [3, 1], [3, 2], [1, 2], [1, 3], [2, 3], [2, 1], [3, 1], [2, 3], [1, 2], [1, 3], [2, 3] ].length)
