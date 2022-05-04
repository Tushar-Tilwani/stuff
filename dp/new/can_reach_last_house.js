/**
 * @param {list_int32} maximum_jump_lengths
 * @return {bool}
 */
function can_reach_last_house(maximum_jump_lengths) {
  // Write your code here.
  const len = maximum_jump_lengths.length;
  const TABLE = new Array(len).fill(false);
  for (let i = 0; i < len; i++) {
    const val = maximum_jump_lengths[i];
    if (TABLE[i + val])
      for (let j = i + 1; j <= i + val; j++) {
        TABLE[j] = true;
      }
  }

  return true;
}
