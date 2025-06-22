const isPrime = (num) => {
  const s = Math.sqrt(num);
  for (let i = 2; i <= s; i++) if (num % i === 0) return false;
  return num > 1;
};

/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  const notPrime = new Array(n).fill(false);
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (notPrime[i] == false) {
      count++;
      for (let j = 2; i * j < n; j++) {
        notPrime[i * j] = true;
      }
    }
  }

  return count;
};
