function getPermutations(array) {
  // Write your code here.
  const result = [];
  addPerm(array, [], 0, result);
  return result;
}

function addPerm(array, slate, index, result) {
  if (index === array.length) {
    result.push(slate.slice(0));
    return;
  }

  for (let i = index; i < array.length; i++) {
    slate.push(array[i]);
    swap(array, i, index);
    addPerm(array, slate, index + 1, result);
    swap(array, i, index);
    slate.pop();
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Do not edit the line below.
exports.getPermutations = getPermutations;
