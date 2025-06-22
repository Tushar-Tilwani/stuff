/*
 * Complete the function below.
 */
function generate_all_expressions(s, target) {
  const results = new Set();
  helper(s, target, [], 0, 0, 0, results);
  return Array.from(results.values());
}

function helper(s, target, slate, startIndex, addVal, multiVal, results) {
  if (startIndex === s.length) {
    if (target == addVal + multiVal) {
      results.add(slate.slice(0, -1).join(""));
    }
    return;
  }

  for (let endIndex = startIndex + 1; endIndex <= s.length; endIndex++) {
    const str = s.slice(startIndex, endIndex);
    const currentVal = parseInt(str);

    let newAddVal = 0;
    let newMultiVal = currentVal;
    const lastOperation = slate[slate.length - 1];

    if (lastOperation === "+") {
      newAddVal = multiVal + addVal;
      newMultiVal = currentVal;
    } else if (lastOperation === "*") {
      newAddVal = addVal;
      newMultiVal = multiVal * currentVal;
    }

    slate.push(str);

    slate.push("+");
    helper(s, target, slate, endIndex, newAddVal, newMultiVal, results);
    slate.pop();

    slate.push("*");
    helper(s, target, slate, endIndex, newAddVal, newMultiVal, results);
    slate.pop();

    slate.pop();
  }
}

console.log(generate_all_expressions("0101", 0));
