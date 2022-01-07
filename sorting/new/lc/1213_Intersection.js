//https://leetcode.com/problems/intersection-of-three-sorted-arrays/

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number[]} arr3
 * @return {number[]}
 */
const arraysIntersection_unsimplified = function (arr1, arr2, arr3) {
  let l1 = arr1.length;
  let l2 = arr2.length;
  let l3 = arr3.length;
  let p1 = 0;
  let p2 = 0;
  let p3 = 0;
  const result = [];

  while (p1 < l1 && p2 < l2 && p3 < l3) {
    if (arr1[p1] === arr2[p2] && arr1[p1] === arr3[p3]) {
      result.push(arr1[p1]);
      p1 += 1;
      p2 += 1;
      p3 += 1;
    } else if (arr1[p1] < arr2[p2]) {
      p1 += 1;
    } else if (arr1[p1] > arr2[p2]) {
      p2 += 1;
    } else if (arr1[p1] < arr3[p3]) {
      p1 += 1;
    } else if (arr1[p1] > arr3[p3]) {
      p3 += 1;
    }
  }

  return result;
};

const arraysIntersection = function (arr1, arr2, arr3) {
  let l1 = arr1.length;
  let l2 = arr2.length;
  let l3 = arr3.length;
  let p1 = 0;
  let p2 = 0;
  let p3 = 0;
  const result = [];

  while (p1 < l1 && p2 < l2 && p3 < l3) {
    if (arr1[p1] === arr2[p2] && arr1[p1] === arr3[p3]) {
      result.push(arr1[p1]);
      p1 += 1;
      p2 += 1;
      p3 += 1;
    } else if (arr1[p1] > arr2[p2]) {
      p2 += 1;
    } else if (arr1[p1] > arr3[p3]) {
      p3 += 1;
    } else {
      p1 += 1;
    }
  }

  return result;
};
