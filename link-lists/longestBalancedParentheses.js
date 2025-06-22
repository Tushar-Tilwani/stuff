/*
 * Complete the function below.
 */
function find_max_length_of_matching_parentheses(brackets) {
  const STACK = [-1];
  let result = 0;
  const LEFT = "(";
  let localMax = 0;

  for (let i = 0; i < brackets.length; i++) {
    if (brackets[i] === LEFT) {
      STACK.push(i);
    } else {
      STACK.pop();
      if (STACK.length === 0) {
        STACK.push(i);
        continue;
      }
      localMax = i - STACK[STACK.length - 1];
      result = Math.max(localMax, result);
    }
  }

  return result;
}
//"()(()))())()"
console.log(find_max_length_of_matching_parentheses("(((()((("));
