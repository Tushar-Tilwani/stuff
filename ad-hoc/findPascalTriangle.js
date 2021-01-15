/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var wiggleSort = function (nums) {};

function merge(arr1, arr2) {
  const arr = [];
  let i = 0;
  let j = 0;
  let k = 0;

  while (i < arr1.length && j < arr2.length) {
    if (k % 2 === 0) {
      if (arr1[i] < arr2[j]) {
        arr.push(arr1[i]);
        i++;
      } else {
        arr.push(arr2[j]);
        j++;
      }
    } else {
      if (arr1[i] > arr2[j]) {
        arr.push(arr1[i]);
        i++;
      } else {
        arr.push(arr2[j]);
        j++;
      }
    }
    k++;
  }

  while (i < arr1.length) {
    arr.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    arr.push(arr2[j]);
    j++;
  }

  return arr;
}
console.log(merge([0,5,2], [3,7,4]))