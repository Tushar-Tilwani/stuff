/**
 * @param {number} n
 * @return {number}
 */
const integerBreak = function (n) {
  const TABLE = [0, 1, 1];

  for (let i = 3; i <= n; i++) {
    TABLE[i] = -Infinity;
    for (let part1 = 1; part1 < i; part1++) {
      const part2 = i - part1;
      TABLE[i] = Math.max(TABLE[i], TABLE[part1] * part2, part1 * part2);
    }
  }
  console.log(TABLE);
  return TABLE[n];
};
