const sortFn = (a, b) => a - b;

function smallestDifference(arrayOne, arrayTwo) {
  // Write your code here.
  const sortedArrayOne = arrayOne.sort(sortFn);
  const sortedArrayTwo = arrayTwo.sort(sortFn);
  let i = 0;
  let j = 0;
  let result = [];
  let globalDiff = Infinity;
  while (i < sortedArrayOne.length && j < sortedArrayTwo.length) {
    const localDiff = Math.abs(sortedArrayOne[i] - sortedArrayTwo[j]);
    if (localDiff < globalDiff) {
      globalDiff = localDiff;
      result = [sortedArrayOne[i], sortedArrayTwo[j]];
    }
    if (sortedArrayOne[i] < sortedArrayTwo[j]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}

// Do not edit the line below.
exports.smallestDifference = smallestDifference;
