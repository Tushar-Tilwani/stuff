/**
 * @param {number[]} nums
 * @return {number}
 */
var minIncrementForUnique = function (nums) {
  const sortedNums = [...nums.sort((a, b) => a - b), Number.MAX_SAFE_INTEGER];
  const dupArray = [];
  let moves = 0;

  for (let i = 0; i < sortedNums.length; i++) {
    if (sortedNums[i] === sortedNums[i - 1]) {
      dupArray.push(sortedNums[i]);
      continue;
    }
    const diff = sortedNums[i] - sortedNums[i - 1];
    // console.log(diff, dupArray);
    for (let j = 1; j < diff && dupArray.length > 0; j++) {
      const currVal = dupArray.shift();
      const toVal = sortedNums[i - 1] + j;
      moves += toVal - currVal;
    }
  }

  return moves;
};
