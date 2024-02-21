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

/**
 * @param {ArrayReader} reader
 * @param {number} target
 * @return {number}
 */
const search = function (reader, target) {
  let end = 1;
  // Target will always be lower than 2^31 - 1
  while (target > reader.get(end)) {
    end = 2 * end;
  }
  let start = Math.floor(end / 2);

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midValue = reader.get(mid);
    if (midValue === target) {
      return mid;
    }
    if (target < midValue) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};
