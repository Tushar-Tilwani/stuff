function longestPeak(array) {
  // Write your code here.
  let tempLongestPeak = 1;
  let result = 0;
  let isPrevIncreasing = true;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] === array[i + 1]) {
      if (tempLongestPeak > 2) {
        result = Math.max(result, tempLongestPeak);
      }
      tempLongestPeak = 1;
    } else if (array[i] < array[i + 1]) {
      if (tempLongestPeak > 2) {
        result = Math.max(result, tempLongestPeak);
      }
      if (isPrevIncreasing) {
        tempLongestPeak++;
      } else {
        tempLongestPeak = 1;
      }
    } else if (array[i] > array[i + 1]) {
      tempLongestPeak++;
    }
    console.log(array[i], tempLongestPeak);
    isPrevIncreasing = array[i] < array[i + 1];
  }

  return result;
}

// if (tempLongestPeak > 2) {
//     result = Math.max(result, tempLongestPeak);
//   }

// Do not edit the line below.
exports.longestPeak = longestPeak;

console.log(longestPeak([1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]));
