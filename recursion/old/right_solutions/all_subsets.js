/*
 * Complete the function below.
 */
function generate_all_subsets(s) {
  const result = [];
  const subProblem = s.split("");
  generate_all_subsets_helper(subProblem, 0, [], result, subProblem.length);
  return result;
}

function generate_all_subsets_helper(s, i, slate, result, len) {
  if (i === len) {
    result.push(concat(slate));
    return;
  }

  generate_all_subsets_helper(s, i + 1, slate, result, len);

  slate.push(s[i]);
  generate_all_subsets_helper(s, i + 1, slate, result, len);
  slate.pop();
}

function concat(arr) {
  return arr.reduce((acc, val) => (acc += val), "");
}

console.log(generate_all_subsets("xyz"));
