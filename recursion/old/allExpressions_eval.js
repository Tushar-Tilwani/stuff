/*
 * Complete the function below.
 */
function generate_all_expressions(s, target) {
  const result = [];
  const digits = s.split("");
  const operators = ["+", "*", "_"];
  generate_all_expressions_helper(digits, operators, 0, [], result);
  return evaluateExpression(result, target);
}

function generate_all_expressions_helper(
  digits,
  operators,
  startIndex,
  slate,
  result
) {
  if (startIndex === digits.length - 1) {
    result.push([...slate, digits[startIndex]]);
    return;
  }
  for (const operator of operators) {
    const isBlank = operator === "_";
    slate.push(digits[startIndex]);
    if (!isBlank) {
      slate.push(operator);
    }

    generate_all_expressions_helper(
      digits,
      operators,
      startIndex + 1,
      slate,
      result
    );
    slate.pop();
    if (!isBlank) {
      slate.pop();
    }
  }
}

function evaluateExpression(expressions, target) {
  return expressions.reduce((acc, exp) => {
    const strExp = exp.join("");
    if (eval(strExp) === target) {
      acc.push(strExp);
    }
    return acc;
  }, []);
}

console.log(generate_all_expressions("1234", 11));
