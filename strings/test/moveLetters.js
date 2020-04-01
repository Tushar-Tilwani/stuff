/*
 * Complete the move_letters_to_left_side_with_minimizing_memory_writes function below.
 */
function move_letters_to_left_side_with_minimizing_memory_writes(s) {
  /*
   * Write your code here.
   */

  const strArr = s.split("");

  let left = -1;
  for (let right = 0; right < strArr.length; right++) {
    if (!Number.isFinite(parseInt(strArr[right]))) {
      left++;
      strArr[left] = strArr[right];
    }
  }
  return strArr.join("");
}

console.log(
  move_letters_to_left_side_with_minimizing_memory_writes("0a193zbr")
);

console.log(move_letters_to_left_side_with_minimizing_memory_writes("1x"));
