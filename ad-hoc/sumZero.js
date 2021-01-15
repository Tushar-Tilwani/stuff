// Complete the sumZero function below.
function sumZero(arr) {
  let totalSum = arr.reduce((acc, val) => acc + val, 0);
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    if (totalSum === 0) {
      return [start, end];
    } else if (totalSum < 0) {
      if (arr[start] < arr[end]) {
        start++;
      } else {
        end--;
      }
    } else {
      if (arr[start] > arr[end]) {
        start++;
      } else {
        end--;
      }
    }
  }

  return [-1];
}
