/*
 * Complete the function below.
 */
function find_all_well_formed_brackets(n) {
  const result = [];
  const half = Math.floor(n / 2);
  find_all_well_formed_brackets_helper([], half, half, result);
  return result;
}

// numRight -> )
// numLeft -> (

function find_all_well_formed_brackets_helper(
  slate,
  numLeft,
  numRight,
  result
) {
  if (numRight < numLeft || numLeft < 0 || numRight < 0) {
    return;
  }

  if (numLeft === 0 && numRight === 0) {
    result.push(slate.join(""));
  }

  slate.push("(");
  find_all_well_formed_brackets_helper(slate, numLeft - 1, numRight, result);
  slate.pop();

  slate.push(")");
  find_all_well_formed_brackets_helper(slate, numLeft, numRight - 1, result);
  slate.pop();
}

console.log(find_all_well_formed_brackets(4));
