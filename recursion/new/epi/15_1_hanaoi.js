function tower_of_hanoi(n) {
  const result = [];
  helper(n, 1, 2, 3, result);
  return result;
}

function helper(n, src, aux, dest, result) {
  if (n === 1) {
    result.push([src, dest]);
    return;
  }

  helper(n - 1, src, dest, aux, result);
  result.push([src, dest]);
  helper(n - 1, aux, src, dest, result);
}

console.log(tower_of_hanoi(3));
