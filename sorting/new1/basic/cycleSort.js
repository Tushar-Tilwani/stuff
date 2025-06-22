// https://uplevel.interviewkickstart.com/resource/rc-video-367728-1166707-247-1559

function cycleSort(arr) {
  let i = 0;
  while (i < arr.length) {
    let noOfElementSmaller = 0;
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        noOfElementSmaller += 1;
      }
    }
    if (noOfElementSmaller === 0) {
      // At the same inex
      i++;
      continue;
    }

    swap(arr, i, i + noOfElementSmaller);
  }

  return arr;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

console.log(cycleSort([3, 19, 17, 6]));
