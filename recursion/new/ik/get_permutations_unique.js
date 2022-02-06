/*
 * Complete the function below.
 *
 * The function accepts an INTEGER_ARRAY arr as parameter
 * and is expected to return a TWO_DIMENSIONAL_INTEGER_ARRAY.
 */
function get_permutations(arr) {
  // Write your code here
  const result = [];
  helper(arr.sort(), 0, [], result);
  return result;
}

function helper(arr, index, slate, result) {
  if (index === arr.length) {
    result.push(slate.slice(0));
    return;
  }

  const set = new Set();

  for (let i = index; i < arr.length; i++) {
    if (!set.has(arr[i])) {
      continue;
    } else {
      set.add(arr[i]);
    }

    swap(arr, i, index);
    slate.push(arr[index]);
    helper(arr, index + 1, slate, result);
    slate.pop();
    swap(arr, i, index);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(get_permutations([1, 2, 2]));
