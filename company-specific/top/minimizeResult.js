/**
 * @param {string} expression
 * @return {string}
 */
var minimizeResult = function (expression) {
  const [leftStr, rightStr] = expression.split("+");
  const plusIndex = expression.indexOf("+");
  const leftEnd = plusIndex - 1;
  const rigtEnd = plusIndex + 1;
  const end = expression.length;

  let left = 0;
  let right = expression.length - 1;
  let startSum = Infinity;

  while (left < leftEnd && right > rigtEnd) {
    const leftPart1 = getNum(leftStr.substring(0, left));
    const leftPart2 = getNum(leftStr.substring(left, leftEnd));

    const rightPart1 = getNum(rightStr.substring(rigtEnd, right));
    const rightPart2 = getNum(rightStr.substring(right));

    const newSum = leftPart1 * (leftPart2 + rightPart1) * rightPart2;
    if (newSum > startSum) {
      break;
    }
    if (getNum(leftStr[left]) < getNum(rightStr[right])) {
      left++;
    } else {
      right--;
    }
    startSum = newSum;
  }
  const result = expression.split("");
  result.splice(left, 0, "(").splice(right, 0, ")");
  return result.join("");
};

function getNum(str, defaultNum = 1) {
  const num = parseInt(str);
  if (isNaN(num)) {
    return defaultNum;
  }
  return num;
}
