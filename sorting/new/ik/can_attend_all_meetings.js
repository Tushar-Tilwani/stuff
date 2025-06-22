/*
Complete the function below.
The function takes a 2D INTEGER ARRAY as input and is expected to return an INTEGER.
*/
function can_attend_all_meetings(intervals) {
  const sorted_intervals = intervals.sort(([a1], [a2]) => a1 - a2);
  const len = sorted_intervals.length - 1;

  for (let i = len - 1; i >= 0; i--) {
    const [prevStartTime] = sorted_intervals[i + 1];
    const [startTime, endTime] = sorted_intervals[i];
    if (prevStartTime >= startTime && prevStartTime <= endTime) {
      return 0;
    }
  }

  return 1;
}

console.log(
  can_attend_all_meetings([
    [1, 5],
    [10, 15],
    [5, 8],
  ])
);

function dutch_flag_sort(arr) {
  let red = -1;
  let green = 0;
  let blue = arr.length;

  while (green < blue) {
    if (arr[green] == "G") {
      green += 1;
    } else if (arr[green] == "R") {
      red += 1;
      swap(arr, green, red);
      green += 1;
    } else if (arr[green] == "B") {
      blue -= 1;
      swap(arr, green, blue);
    }
  }

  return arr;
}

/*
 * Complete the merger_first_into_second function below.
 */
function merger_first_into_second(arr1, arr2) {
  /*
   * Write your code here.
   */

  let p1 = arr1.length - 1;
  let p2 = arr2.length - 1;
  let i = arr2.length - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (arr1[p1] >= arr2[p2]) {
      arr2[i] = arr1[p1];
      p1 -= 1;
    } else {
      arr2[i] = arr1[p2];
      p2 -= 1;
    }
    i -= 1;
  }

  while (p1 >= 0) {
    arr2[i] = arr1[p1];
    p1 -= 1;
    i -= 1;
  }

  while (p2 >= 0) {
    arr2[i] = arr1[p2];
    p2 -= 1;
    i -= 1;
  }

  return arr2;
}

function merge_sort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) {
    return arr;
  }
  const mid = start + Math.floor((end - start) / 2);
  merge_sort(arr, start, mid);
  merge_sort(arr, mid + 1, end);
  const sortedArr = merge(arr, start, mid, end);
  let j = 0;
  for (let i = start; i <= end; i++) {
    arr[i] = sortedArr[j];
    j++;
  }

  // Write your code here.
  return arr;
}

function merge(arr, start, mid, end) {
  const result = [];

  let p1 = start;
  let p2 = mid + 1;

  while (p1 <= mid && p2 <= end) {
    if (arr[p1] <= arr[p2]) {
      result.push(arr[p1]);
      p1++;
    } else {
      result.push(arr[p2]);
      p2++;
    }
  }

  while (p1 <= mid) {
    result.push(arr[p1]);
    p1++;
  }

  while (p2 <= end) {
    result.push(arr[p2]);
    p2++;
  }

  return result;
}
console.log(merge_sort([1, 5, 3]));

/*
    Complete the function below.
    The function takes an INTEGER ARRAY and an INTEGER as inputs and is expected to return an INTEGER.
*/

const quick_select = (arr, k, start = 0, end = arr.length - 1) => {
  const pivotIndex = randomInRange(start, end);
  const pivotValue = arr[pivotIndex];
  swap(arr, start, pivotIndex);

  let leftIndex = start;
  let equalIndex = start + 1;
  let rightIndex = end;

  //Descending sorting
  while (equalIndex <= rightIndex) {
    if (arr[equalIndex] === pivotValue) {
      equalIndex++;
    } else if (arr[equalIndex] > pivotValue) {
      leftIndex++;
      swap(arr, leftIndex, equalIndex);
      equalIndex++;
    } else if (arr[equalIndex] < pivotValue) {
      swap(arr, rightIndex, equalIndex);
      rightIndex--;
    }
  }

  swap(arr, leftIndex, start);

  if (k > leftIndex && k <= equalIndex) {
    return pivotValue;
  }

  if (k <= leftIndex) {
    return quick_select(arr, k, start, leftIndex);
  }

  if (k >= rightIndex) {
    return quick_select(arr, k, rightIndex, end);
  }

  return pivotValue;
};

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const arr = [1, 3, 2, 2, 5, 4, 1, 1, 2, 3];
console.log(
  "Quick Select",
  quick_select(arr, 1),
  arr.sort((a, b) => b - a)
);
