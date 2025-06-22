/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
  let newSum = getSum(num);

  while (newSum >= 10) {
    newSum = getSum(newSum);
  }

  return newSum;
};

function getSum(num) {
  let sum = 0;
  while (num !== 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

console.log(addDigits(284758934));
