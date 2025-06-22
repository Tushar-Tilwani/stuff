/**
 * @param {string} expression
 * @return {string}
 */
var minimizeResult = function (expression) {
  const [leftStr, rightStr] = expression.split("+");
  let left = 0;
  let right = rightStr.length;
  let resultString = ["(" + leftStr, "+", rightStr, ")"];
  let resultSum = getNum(leftStr) + getNum(rightStr);

  while (left < leftStr.length - 1 && right > 0) {
    if (getNum(leftStr[left]) < getNum(rightStr[right])) {
      left++;
    } else {
      right--;
    }
    const [leftPart1, leftPart2] = getPart(leftStr, left);
    const [rightPart1, rightPart2] = getPart(rightStr, right);
    const newSum =
      getNum(leftPart1) *
      (getNum(leftPart2) + getNum(rightPart1)) *
      getNum(rightPart2);
    if (newSum > resultSum) {
      return resultString.join("");
    }
    resultSum = newSum;
    resultString = [
      leftPart1,
      "(",
      leftPart2,
      "+",
      rightPart1,
      ")",
      rightPart2,
    ];
  }
  return resultString.join("");
};

function getNum(str, defaultNum = 1) {
  const num = parseInt(str);
  if (isNaN(num)) {
    return defaultNum;
  }
  return num;
}

function getPart(str, index) {
  return [str.substring(0, index), str.substring(index)];
}
