// https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var minDominoRotations = function(A, B) {
  /**
   * There are 4 possible cases:
   * make values in A equal to A[0]
   * make values in B equal to A[0]
   * make values in A equal to B[0]
   * make values in B equal to B[0]
   * 0 is not neccessary it could be any random Index.
   * However , make sure to use the same randomIndex
   * for all values. Intentionally use getRandom to show we can choose any index
   */
  const index = getRandom(0, A.length - 1);
  const min = Math.min(
    swapChecker(A[index], A, B),
    swapChecker(A[index], B, A),
    swapChecker(B[index], B, A),
    swapChecker(B[index], A, B)
  );
  return isFinite(min) ? min : -1;
};

function swapChecker(element, arr1, arr2) {
  /**
   * Try to make all values in arr2 equal to element.
   * If any index i in arr2 is not equal element.
   * Try to pull in the value from arr1 at index i.
   * However, if arr1[i] is not equal to element.
   * Then we cannot rotate dominos to make all values same.
   */
  let count = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr2[i] !== element) {
      if (element !== arr1[i]) {
        return Infinity;
      }
      count++;
    }
  }
  return count;
}

/**
 * 
 * @param {number} n1 
 * @param {number} n2 
 */
const getRandom = (n1, n2) => Math.floor(Math.random() * (n2 - n1 + 1)) + n1;

var A = [2, 1, 2, 4, 2, 2],
  B = [5, 2, 6, 2, 3, 2];
// var A = [3, 5, 1, 2, 3],
//   B = [3, 6, 3, 3, 4];
console.log(minDominoRotations(A, B));
