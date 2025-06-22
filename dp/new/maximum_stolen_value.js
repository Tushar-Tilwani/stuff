/**
 * @param {list_int32} values
 * @return {int32}
 */
function maximum_stolen_value(values) {
  // Write your code here.
  const TABLE = [values[0], values[1]];
  for (let i = 2; i < values.length; i++) {
    TABLE[i] = values[i] + Math.max(TABLE[i - 2], TABLE[i - 3] ?? 0);
  }
  return TABLE[values.length - 1];
}

const arr = [6, 1, 2, 7];

console.log(maximum_stolen_value(arr));
