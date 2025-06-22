/*
 * Complete the function below.
 */

const JOIN_OP = "_";
function generate_all_expressions(s, target) {
  const result = [];
  const digits = s.split("");
  const operators = ["+", "*", JOIN_OP];
  generate_all_expressions_helper(digits, operators, 0, [], result);
  const resultsWithoutJoin = result.map(removeJoin);
  const targets = resultsWithoutJoin
    .map(d => d.slice(0))
    .map(runMultiply)
    .map(runAdd);

  const finalResults = [];
  for (let i = 0; i < targets.length; i++) {
    if (targets[i][0] === target) {
      finalResults.push(resultsWithoutJoin[i].join(""));
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
    result.push([...slate, digits[startIndex]]);
    return;
  }
  for (const operator of operators) {
    slate.push(digits[startIndex]);
    slate.push(operator);

    generate_all_expressions_helper(
      digits,
      operators,
      startIndex + 1,
      slate,
      result
    );
    slate.pop();
    slate.pop();
  }
}

function removeJoin(expression) {
  if (expression.length < 2) {
    return expression;
  }
  let i = 1;
  while (i < expression.length) {
    if (expression[i] === JOIN_OP) {
      expression[i - 1] = expression[i - 1] + expression[i + 1];
      expression.splice(i, 2);
    } else {
      i += 1;
    }
  }
  return expression;
}

function runAdd(expression) {
  if (expression.length < 2) {
    return expression.map(exp => parseInt(exp));;
  }
  let i = 1;
  while (i < expression.length) {
    if (expression[i] === "+") {
      expression[i - 1] =
        parseInt(expression[i - 1]) + parseInt(expression[i + 1]);
      expression.splice(i, 2);
    } else {
      i += 1;
    }
  }
  return expression;
}

function runMultiply(expression) {
  if (expression.length < 2) {
    return expression.map(exp => parseInt(exp));
  }
  let i = 1;
  while (i < expression.length) {
    if (expression[i] === "*") {
      expression[i - 1] =
        parseInt(expression[i - 1]) * parseInt(expression[i + 1]);
      expression.splice(i, 2);
    } else {
      i += 1;
    }
  }
  return expression;
}

console.log(generate_all_expressions("050505", 5));

function expressionRunner(op) {
  return expressionl => {
    const expression = expressionl.split(op);
    if (expression.length < 2) {
      return expression.map(exp => parseInt(exp));
    }
    let i = 1;
    while (i < expression.length) {
      if (expression[i] === op) {
        if (op === "+") {
          expression[i - 1] =
            parseInt(expression[i - 1]) + parseInt(expression[i + 1]);
        } else if (op === "*") {
          expression[i - 1] =
            parseInt(expression[i - 1]) * parseInt(expression[i + 1]);
        }
        expression.splice(i, 2);
      } else {
        i += 1;
      }
    }
    return expression;
  };
}