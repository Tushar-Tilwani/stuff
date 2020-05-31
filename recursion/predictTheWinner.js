/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function(nums) {
  const finalScore = helper(nums, 0, 0, true);
  console.log(finalScore);
  return finalScore[0] > finalScore[1];
};

function helper(arr, score1, score2, isPlayerOne) {
  if (arr.length === 0) {
    return [score1, score2];
  }

  if (isPlayerOne) {
    const top = arr.shift();
    const tScore = helper(arr, score1 + top, score2, false);
    arr.unshift(top);

    const last = arr.pop();
    const bScore = helper(arr, score1 + last, score2, false);
    arr.push(last);
    // console.log("play1", tScore, bScore);
    return tScore[0] > bScore[0] ? tScore : bScore;
  } else {
    // Player 2
    const top = arr.shift();
    const tScore = helper(arr, score1, score2 + top, true);
    arr.unshift(top);

    const last = arr.pop();
    const bScore = helper(arr, score1, score2 + last, true);
    arr.push(last);
    // console.log("play2", tScore, bScore);
    return tScore[1] > bScore[1] ? tScore : bScore;
  }
}

const arr = [1, 5, 2];
console.log(PredictTheWinner(arr));
