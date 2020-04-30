/*
 * Complete the 'lcs' function below.
 *
 * The function accepts STRING a and STRING b as parameter.
 * The function is expected to return a STRING.
 */
function lcs(a, b) {
  // Write your code here
  const result = [""];
  helper(a, 0, b, 0, [], result);
  return result[0] || -1;
}

function helper(str1, i1, str2, i2, path, result) {
  if (i2 >= str2.length || i1 >= str1.length) {
    if (result[0].length < path.length) {
      result[0] = path.join('');
    }
    return result[0];
  }

  if (str1[i1] === str2[i2]) {
    path.push(str1[i1]);
    helper(str1, i1 + 1, str2, i2 + 1, path, result);
    path.pop();
  } else {
    helper(str1, i1 + 1, str2, i2, path, result);
    helper(str1, i1, str2, i2 + 1, path, result);
  }
  return result[0];
}

console.log(lcs("ABCDE", "AECBD"));
