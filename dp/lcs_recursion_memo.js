/*
 * Complete the 'lcs' function below.
 *
 * The function accepts STRING a and STRING b as parameter.
 * The function is expected to return a STRING.
 */
function lcs(a, b) {
  // Write your code here
  const result = [""];
  const memo = new Map();
  helper(a, 0, b, 0, [], result, memo);
  console.log(memo);
  return result[0] || -1;
}

function helper(str1, i1, str2, i2, path, result, memo) {
  const current = i1 + "" + i2;
  // console.log(current, path);
  if (memo.has(current)) {
    return memo.get(current);
  }
  if (i2 >= str2.length || i1 >= str1.length) {
    if (result[0].length < path.length) {
      result[0] = path.join("");
    }
    return path.join("");
  }

  if (str1[i1] === str2[i2]) {
    path.push(str1[i1]);
    const ans = helper(str1, i1 + 1, str2, i2 + 1, path, result, memo);
    path.pop();
    memo.set(current, ans);
  } else {
    const ans1 = helper(str1, i1 + 1, str2, i2, path, result, memo);
    const ans2 = helper(str1, i1, str2, i2 + 1, path, result, memo);
    memo.set(current, ans1.length > ans2.length ? ans1 : ans2);
  }
  return memo.get(current);
}

console.log(lcs("ABCDE", "AECBD"));

/*
Hiring Manager: Earns Trust; Dive Deep; Research and Analysis
Interviewer 2: Ownership;  Insist on the Highest Standards
*/
