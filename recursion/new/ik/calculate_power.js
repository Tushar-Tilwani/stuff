const MOD = 1000000007n;

/**
 * @param {int64} a
 * @param {int64} b
 * @return {int32}
 */
const MEMO = {};
function calculate_power(a, b) {
  if (b === 0) {
    return 1;
  }
  if (b === 1) {
    return a;
  }
  //   if (Number.isFinite(MEMO[b])) {
  //     return MEMO[b];
  //   }
  let result = BigInt(1);
  const newA = BigInt(a);
  const remainder = b % 2;
  const divisor = Math.floor(b / 2);
  const halfResult = calculate_power(newA, divisor);
  if (remainder === 1) {
    result = (newA * halfResult) % MOD;
  }
  result = (result * halfResult) % MOD;
  return result;
}

console.log(calculate_power(2, 10));
