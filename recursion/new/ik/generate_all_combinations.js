/*
    The function accepts an INTEGER ARRAY and an INTEGER as inputs and 
    is expected to return a 2D INTEGER ARRAY

    Complete the function below. 
*/
function generate_all_combinations(arr, target) {
  const sortedArr = arr.sort((a, b) => a - b);
  const results = [];
  helper(sortedArr, target, 0, [], null, results);
  return results;
}

function helper(arr, target, index, slate, prevValue, results) {
  if (index === arr.length) {
    if (target === 0) {
      results.push(slate.slice(0));
    }
    return;
  }

  if (target < 0) {
    return;
  }

  helper(arr, target, index + 1, slate, arr[index], results);

  if (arr[index] !== prevValue) {
    slate.push(arr[index]);
    helper(arr, target - arr[index], index + 1, slate, null, results);
    slate.pop();
  }
}

console.log(generate_all_combinations([1, 1, 1, 1], 2));
