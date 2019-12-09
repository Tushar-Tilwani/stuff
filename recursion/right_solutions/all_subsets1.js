/*
 * Complete the function below.
 */
function generate_all_subsets(s) {
  const result = [];
  function helper(i, slate) {
    if (i === s.length) {
      result.push(slate);
    } else {
      helper(i + 1, slate);
      helper(i + 1, slate + s[i]);
    }
  }

  helper(0, "");
  return result;
}

console.log(generate_all_subsets("xyz"));
