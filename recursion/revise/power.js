const MOD = 1000000007;

function calculate_power(base, exponent) {
  base = NumberInt(base) % MOD;
  if (exponent === 0) {
    return 1;
  }

  // Write your code here
  const newA = (base * base) % MOD;
  //   console.log(a, newA);
  let result = NumberInt(calculate_power(newA, Math.floor(exponent / 2)));

  if (exponent % 2 === 1) {
    result = NumberInt(result * base) % MOD;
  }

  return result;
}

console.log(calculate_power(999999999999999999, 1000000000000000000)); //779807758
