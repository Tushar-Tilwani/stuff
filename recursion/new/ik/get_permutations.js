/*
 * Complete the function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter and expected to return a 2D_INTEGER_ARRAY.
 */
function get_permutations(arr) {
  // Write your code here
  const result = [];
  function helper(arr, index, slate, result) {
    const end = arr.length;
    if (index === end) {
      result.push(slate.slice(0));
      return;
    }

    for (let i = index; i < end; i++) {
      swap(arr, i, index);
      slate.push(arr[index]);
      helper(arr, index + 1, slate, result);
      slate.pop();
      swap(arr, index, i);
    }
  }

  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  helper(arr, 0, [], result);
  return result;
}

console.log(get_permutations([1, 2, 3]));
