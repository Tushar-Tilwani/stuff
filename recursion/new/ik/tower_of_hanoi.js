/**
 * @param {int32} n
 * @return {list_list_int32}
 */
function tower_of_hanoi(n) {
  // Write your code here.
  const result = [];
  moveDisc(src, dest, aux, n, result);
  return result;
}

function moveDisc(src, dest, aux, n, result) {
  if (n === 1) {
    result.push([src, dest]);
    return;
  }
  moveDisc(src, aux, dest, n - 1, result);
  result.push([src, dest]);
  moveDisc(aux, dest, src, n - 1, result);
}
