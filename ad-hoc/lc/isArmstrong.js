/**
 * @param {number} n
 * @return {boolean}
 */
var isArmstrong = function (n) {
  const numArr = getIntArray(n);

  return (
    numArr.reduce((acc, val) => acc + Math.pow(val, numArr.length), 0) === n
  );
};

function getIntArray(n) {
  const result = [];
  while (n > 0) {
    result.push(n % 10);
    n = Math.floor(n / 10);
  }
  return result.reverse();
}

console.log(isArmstrong(2));
