function bestSeat(seats) {
  let maxCount = 0;
  let count = 0;
  let startIndex = null;
  let endIndex = null;
  let result = -1;
  for (let i = 0; i < seats.length; i++) {
    if (seats[i] === 0) {
      startIndex = Math.min(startIndex ?? i, i);
      endIndex = Math.max(endIndex ?? i, i);
      count++;
      continue;
    }

    if (count >= maxCount) {
      result = Math.floor((startIndex + endIndex) / 2);
      maxCount = count;
    }
    count = 0;
    startIndex = null;
    endIndex = null;
  }

  // Write your code here.
  return result;
}

// Do not edit the line below.
exports.bestSeat = bestSeat;
