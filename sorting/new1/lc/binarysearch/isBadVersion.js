// Check this: https://uplevel.interviewkickstart.com/resource/library-video-884
// 1:10
// Basically when start > end while loop exit
// That's boundary cross over between two
// start is just become first bad version
// end becomes last good version

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let start = 1;
    let end = n;
    while (start <= end) {
      const mid = Math.floor((end - start) / 2) + start;
      if (isBadVersion(mid)) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return start;
  };
};
