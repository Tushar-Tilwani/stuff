/*
 * Complete the function below.
 */

const JOIN_OP = "_";
function generate_all_expressions(s, target) {
  const result = [];
  const digits = s.split("");
  const operators = ["+", "*", JOIN_OP];
  generate_all_expressions_helper(digits, operators, 0, "", result);

  const targets = result.map(e => eval(e));

  const finalResults = [];
  for (let i = 0; i < targets.length; i++) {
    if (targets[i] === target) {
      finalResults.push(result[i]);
    }
  }
  return finalResults;
}

function generate_all_expressions_helper(
  digits,
  operators,
  startIndex,
  slate,
  result
) {
  if (startIndex === digits.length - 1) {
    result.push(slate + digits[startIndex]);
    return;
  }

  for (const operator of operators) {
    const isBlank = operator === "_";
    let newSlate = slate + digits[startIndex];

    if (!isBlank) {
      newSlate += operator;
    }

    generate_all_expressions_helper(
      digits,
      operators,
      startIndex + 1,
      newSlate,
      result
    );
  }
}

console.log(generate_all_expressions("1123", 124));
