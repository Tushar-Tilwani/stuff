/**
 * @param {list_int32} arr
 * @param {int32} k
 * @return {list_int32}
 */
function find_top_k_frequent_elements(arr, k) {
  // Write your code here.
  const map = arr.reduce((map, ele) => {
    if (map.has(ele)) {
      map.set(ele, map.get(ele) + 1);
    } else {
      map.set(ele, 1);
    }
    return map;
  }, new Map());

  const freqArray = Array.from(map.entries());

  if (k < 1 || k > freqArray.length) {
    return undefined;
  }

  const topKFreqArray = quick_select(freqArray, freqArray.length - k);
  return topKFreqArray.map((k) => k[0]);
}

const quick_select = (arr, k, start = 0, end = arr.length - 1) => {
  const pivotIndex = randomInRange(start, end);
  const pivotValue = getValue(arr, pivotIndex);
  swap(arr, start, pivotIndex);

  let lessIndex = start;
  let equalIndex = start + 1;
  let greaterIndex = end;
  //Ascending sorting: Change line 32,36 to make it descending
  while (equalIndex <= greaterIndex) {
    const currValue = getValue(arr, equalIndex);
    if (pivotValue > currValue) {
      lessIndex += 1;
      swap(arr, equalIndex, lessIndex);
      equalIndex += 1;
    } else if (pivotValue < currValue) {
      swap(arr, equalIndex, greaterIndex);
      greaterIndex -= 1;
    } else {
      equalIndex += 1;
    }
  }

  swap(arr, start, lessIndex);

  if (k < lessIndex) {
    return quick_select(arr, k, start, lessIndex - 1);
  } else if (k > greaterIndex) {
    return quick_select(arr, k, greaterIndex + 1, end);
  } else {
    return arr.slice(k, arr.length);
  }
};

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getValue(arr, index) {
  return arr[index][1];
}

const arr = [1, 3, 2, 2, 5, 4, 4, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3];
console.log(
  "Quick Select",
  find_top_k_frequent_elements(arr, 3),
  arr.sort((a, b) => b - a)
);
