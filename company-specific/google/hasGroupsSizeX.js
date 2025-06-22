/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
  if (deck.length < 2) {
    return false;
  }
  const freqMap = deck.reduce((acc, v) => {
    if (!acc.has(v)) {
      acc.set(v, 0);
    }
    acc.set(v, acc.get(v) + 1);
    return acc;
  }, new Map());

  const values = Array.from(freqMap.values());
  const primeFactors = prime_factors(Math.min(...values));
  return primeFactors.some((factor) =>
    values.every((val) => {
      return val % factor === 0;
    })
  );
};

function prime_factors(num) {
  function is_prime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  const result = [];
  for (let i = 2; i <= num; i++) {
    while (is_prime(i) && num % i === 0) {
      if (!result.includes(i)) result.push(i);
      num /= i;
    }
  }
  return result;
}
