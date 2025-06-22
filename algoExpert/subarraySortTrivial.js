const sortFn = (a, b) => a - b;
function subarraySort(array) {
  // Write your code here.
  const sortedArray = [...array].sort(sortFn);
  let start = -1;
  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i] !== array[i]) {
      start = i;
      break;
    }
  }

  let end = -1;
  for (let i = sortedArray.length - 1; i >= 0; i--) {
    if (sortedArray[i] !== array[i]) {
      end = i;
      break;
    }
  }

  return [start, end];
}

// Do not edit the line below.
exports.subarraySort = subarraySort;
