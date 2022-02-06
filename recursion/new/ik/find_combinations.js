/*
    Complete the function below.
    The function takes two INTEGERS as inputs and is expected to return an INTEGER 2D ARRAY.
*/
function find_combinations(n, k) {
  const result = [];
  helper(n, k, 0, [], result);
  return result;
}

function helper(n, k, start, slate, result) {
  if (slate.length > k) {
    return;
  }
  if (slate.length === k) {
    result.push(slate.slice(0));
    return;
  }

  for (let i = start; i < n; i++) {
    slate.push(i + 1);
    helper(n, k, i + 1, slate, result);
    slate.pop();
  }
}

console.log(find_combinations(6, 6));
