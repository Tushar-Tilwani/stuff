/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */
var findInMountainArray = function (target, mountainArr) {
  const start = 0;
  const end = mountainArr.length() - 1;
  const peakElementIndex = getPeakElementIndex(mountainArr, start, end);
  if (peakElementIndex === -1) {
    // No peak found
    return peakElementIndex;
  }

  if (target === mountainArr.get(peakElementIndex)) {
    // Since there will be only one peak element
    // Micro optimization
    return peakElementIndex;
  }

  // Left Binary Search
  const lResult = lBinarySearch(mountainArr, target, start, peakElementIndex - 1);

  if (lResult !== -1) {
    return lResult;
  }

  // Right Binary Search
  return rBinarySearch(mountainArr, target, peakElementIndex + 1, end);
};

function lBinarySearch(mountainArr, target, start, end) {
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midValue = mountainArr.get(mid);
    if (midValue === target) {
      // Only one value will be there  in one half
      return mid;
    }

    if (target <= midValue) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

function rBinarySearch(mountainArr, target, start, end) {
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midValue = mountainArr.get(mid);
    if (midValue === target) {
      // Only one value will be there  in one half
      return mid;
    }

    if (target > midValue) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}

function getPeakElementIndex(mountainArr, start, end) {
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midValue = mountainArr.get(mid);
    const leftOfMidValue = mountainArr.get(mid - 1);
    const rightOfMidValue = mountainArr.get(mid + 1);
    if (midValue > leftOfMidValue && midValue > rightOfMidValue) {
      return mid;
    }

    if (mid === 0 || midValue > leftOfMidValue) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}
