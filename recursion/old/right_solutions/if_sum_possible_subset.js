/*
 * Complete the function below.
 */
function check_if_sum_possible(arr, k) {
  return check_if_sum_possible_helper(arr, 0, 0, k);
}

function check_if_sum_possible_helper(arr, sum, i, k) {
  if (i === arr.length) {
    if (sum === k) {
      return 1;
    }
    return 0;
  }

  return (
    check_if_sum_possible_helper(arr, sum, i + 1, k) +
    check_if_sum_possible_helper(arr, sum + arr[i], i + 1, k)
  );
}

console.log(check_if_sum_possible([0], 0));
