function findSmallest(arr, n = arr.length) {
  let res = 1; // Initialize result

  // Traverse the array and increment 'res' if arr[i] is
  // smaller than or equal to 'res'.
  for (let i = 0; i < n && arr[i] <= res; i++) {
    res = res + arr[i];
  }

  return res;
}

console.log(findSmallest([2, 5]));
