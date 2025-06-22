/**
 * @param {number[]} nums
 * @return {number}
 */
var minIncrementForUnique = function (nums) {
  const seenSet = new Set();
  let moves = 0;
  for (const num of nums) {
    if (!seenSet.has(num)) {
      seenSet.add(num);
      continue;
    }

    for (let i = 1; i <= 10 ** 5; i++) {
      if (!seenSet.has(num + i)) {
        moves += i;
        seenSet.add(num + i);
        break;
      }
    }
  }
  //    console.log(seenSet);
  return moves;
};
