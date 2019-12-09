/*
 * Complete the function below.
 */
function check_if_sum_possible(arr, k) {
  const result = [];
  check_if_sum_possible_helper(arr, [], 0, k, result);
  return result;
}

function check_if_sum_possible_helper(arr, slate, start, k, result) {
  if (start === arr.length) {
    return;
  }

  let sum = 0;

  for (let i = start; i < arr.length; i++) {
    sum += arr[i];
    slate.push(arr[i]);
    if (sum === k) {
      result.push(slate.slice(0));
    }
  }
  check_if_sum_possible_helper(arr, [], start + 1, k, result);
}

console.log(check_if_sum_possible([-5, 8, 1, 11, -8], 14));
