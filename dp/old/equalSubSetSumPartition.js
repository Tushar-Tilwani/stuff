/*
 * Complete the 'equalSubSetSumPartition' function below.
 *
 * @param s: input array as parameter.
 */

function equalSubSetSumPartition(s) {
  // Write your code here
  const k = 2;
  const targetSum = s.reduce((acc, v) => acc + v, 0) / k;
  const result = [];
  const used = new Set();
  permutationHelper(s, 0, k, 0, targetSum, [], used, result);
  return result;
}
let i = 0;
function permutationHelper(s, index, k, sum, targetSum, path, used, result) {
  result[i] = result[i] || [];
  if (k < 0 || sum > targetSum) {
    return;
  }

  console.log(sum, path);

  if (index === s.length && sum === targetSum) {
    result[i].push(path.slice(0));
    i++;
    return result;
  }

  if (sum === targetSum) {
    result[i].push(path.slice(0));
    permutationHelper(
      s,
      index + 1,
      k - 1,
      s[index],
      targetSum,
      [s[index]],
      used,
      result
    );
    return;
  }

  for (let i = index; i < s.length; i++) {
    sum = sum + s[i];
    path.push(s[i]);

    // swap(s, i, index);

    permutationHelper(s, i + 1, k, sum, targetSum, path, used, result);

    // swap(s, i, index);
    path.pop();

    sum = sum - s[i];
  }
  return result;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(equalSubSetSumPartition([10, -3, 7, 2, 1, 3]));
