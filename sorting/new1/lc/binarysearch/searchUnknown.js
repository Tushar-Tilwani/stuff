/**
 * // This is the ArrayReader's API interface.
 * // You should not implement it, or speculate about its implementation
 * function ArrayReader() {
 *
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 * };
 */

const MAX = Math.pow(2, 31) - 1;

/**
 * @param {ArrayReader} reader
 * @param {number} target
 * @return {number}
 */
const search = function (reader, target) {
  let start = 0;
  let end = MAX;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midValue = reader.get(mid);
    if (midValue === target) {
      return mid;
    }
    if (midValue === MAX || target < midValue) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};
