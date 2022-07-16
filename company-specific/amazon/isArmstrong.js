const getDigits = (n) => {
  const arr = [];
  while (n > 0) {
    arr.push(n % 10);
    n = Math.floor(n / 10);
  }
  return arr.reverse();
};

/**
 * @param {number} n
 * @return {boolean}
 */
var isArmstrong = function (n) {
  const digits = getDigits(n);
  const l = digits.length;
  return digits.reduce((acc, d) => acc + Math.pow(d, l), 0) === n;
};

console.log(isArmstrong(153));
