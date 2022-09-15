/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number[]} arr3
 * @return {number[]}
 */
var arraysIntersection = function (arr1, arr2, arr3) {
  return getIntersection(arr1, arr2);
};

function getIntersection(arr1, arr2) {
  const result = [];
  let s1 = 0;
  let s2 = 0;
  while (s1 < arr1.length && s2 < arr2.length) {
    if (arr1[s1] < arr2[s2]) {
      s1++;
      continue;
    }

    if (arr1[s1] > arr2[s2]) {
      s2++;
      continue;
    }
    result.push(arr1[s1]);
    s1++;
    s2++;
  }
  return result;
}

