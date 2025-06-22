/*
 * Complete the function below.
 */
function topK(arr, k) {
  const uArr = [...new Set(arr)];
  const length = uArr.length;
  const resultIndex = length - k;

  if(resultIndex < 1){
    return uArr;
  }
  
  qSelect(uArr, 0, length - 1, resultIndex);

  return uArr.slice(resultIndex, length);
}

function qSelect(arr, start, end, rIndex) {
  if (end <= start) {
    return;
  }

  let pIndex = randomInRange(start, end);
  let pivot = arr[pIndex];
  swap(arr, start, pIndex);

  let left = start;
  let right = start + 1;

  while (right <= end) {
    if (arr[right] < pivot) {
      swap(arr, right, left + 1);
      left++;
    }
    right++;
  }
  swap(arr, start, left);
  if (left === rIndex) {
    return;
  } else if (left < rIndex) {
    qSelect(arr, left + 1, end, rIndex);
  } else {
    qSelect(arr, start, left - 1, rIndex);
  }
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const arr = [4, 8, 9, 6, 6, 2, 10, 2, 8, 1, 2];
console.log(arr, topK(arr, 2));
