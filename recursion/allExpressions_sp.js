/*
 * Complete the function below.
 */

const OPS = {
  JOIN: "J",
  PLUS: "+",
  MULTIPLY: "*"
};
function generate_all_expressions(s, target) {
  const result = [];
  const digits = s.split("").map(d => parseInt(d));
  const operators = [OPS.PLUS, OPS.MULTIPLY, OPS.JOIN];
  helper(digits, 0, operators, [], digits[0], result, target, null, null);
  return result;
}

function helper(
  digits,
  digitIndex,
  operators,
  path,
  partialTarget,
  result,
  target,
  prevValue,
  prevOp
) {
  const currentValue = digits[digitIndex];
  const currentOp = path[path.length - 1];
  path.push(currentValue);

  if (currentOp) {
    [partialTarget, prevValue, prevOp] = h(
      partialTarget,
      currentValue,
      prevValue,
      currentOp,
      prevOp
    );
  }

  console.log(
    prevValue,
    prevOp,
    path.filter(v => v !== OPS.JOIN).join(""),
    partialTarget
  );

  if (digitIndex === digits.length - 1) {
    if (partialTarget === target) {
      result.push(path.filter(v => v !== OPS.JOIN).join(""));
    }

    path.pop();
    return;
  }

  for (const op of operators) {
    path.push(op);
    helper(
      digits,
      digitIndex + 1,
      operators,
      path,
      partialTarget,
      result,
      target,
      prevValue
    );
    path.pop();
  }
  path.pop();
}

function h(partialTarget, currentValue, prevValue, currentOp, prevOp) {
  if (currentOp === OPS.JOIN) {
    if (prevOp === OPS.PLUS) {
      partialTarget = partialTarget - prevValue;
      currentValue = joinOP(prevValue, currentValue);

      /* BODMAS is complicated */
      currentOp = prevOp;

      partialTarget = partialTarget + currentValue;
    } else if (prevOp === OPS.MULTIPLY) {
      partialTarget = partialTarget / prevValue;
      currentValue = joinOP(prevValue, currentValue);

      /* BODMAS is complicated */
      currentOp = prevOp;

      partialTarget = partialTarget * currentValue;
    } else {
      partialTarget = joinOP(partialTarget, currentValue);
    }
  } else if (currentOp === OPS.MULTIPLY) {
    if (prevOp === OPS.PLUS) {
      partialTarget = partialTarget - prevValue;
      partialTarget = partialTarget + prevValue * currentValue;
      /* BODMAS is complicated */
      currentOp = prevOp;
    } else {
      partialTarget = partialTarget * currentValue;
    }
  } else {
    partialTarget = partialTarget + currentValue;
  }
  return [partialTarget, currentValue, currentOp];
}
function joinOP(a, b) {
  return 10 * a + b;
}

// console.log(joinOP(4, 2))
console.log(generate_all_expressions("2222", 26));
