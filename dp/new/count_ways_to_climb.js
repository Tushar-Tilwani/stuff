/**
 * @param {list_int32} steps
 * @param {int32} n
 * @return {int64}
 */
function count_ways_to_climb(steps, n) {
  // Write your code here.
  const TABLE = [1];
  for (let i = 1; i <= n; i++) {
    TABLE[i] = 0;
    for (const step of steps) {
      if (i - step < 0) {
        continue;
      }
      TABLE[i] += TABLE[i - step];
    }
  }
  return TABLE[n];
}
