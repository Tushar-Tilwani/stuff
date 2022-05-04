/**
 * @param {list_int32} maximum_jump_lengths
 * @return {bool}
 */
function can_reach_last_house(maximum_jump_lengths) {
  // Write your code here.
  const len = maximum_jump_lengths.length;
  let lastVisitedIndex = len - 1;
  for (let i = len - 2; i >= 0; i--) {
    const val = maximum_jump_lengths[i];
    if (val + i >= lastVisitedIndex) {
      lastVisitedIndex = i;
    }
  }

  return lastVisitedIndex === 0;
}
