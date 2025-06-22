/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
function buddyStrings(s, goal) {
  if (s.length !== goal.length) {
    return false;
  }
  const strArr = s.split("");
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      swap(strArr, i, j);
      if (strArr.join("") === goal) {
        return true;
      }
      swap(strArr, i, j);
    }
  }
  return false;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
