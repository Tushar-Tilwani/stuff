// Will need to do again.

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numWays = function (n, k) {
  const TABLE = new Array(n + 1).fill(1);
  TABLE[1] = k;
  TABLE[2] = k * k;

  for (let i = 3; i <= n; i++) {
    /**
     *  TABLE[i] = lastColorDiff(i) + lastColorSame(i)
     * X->any Color
     * G-> Green
     * B -> Blue
     *
     * X G B
     * lastColorDiff(i) = lastColor * allColorsExceptTheCurrentOne i.e k-1
     *
     *  X G G
     * lastColorSame() = lastToLastColor * allColorsExceptTheCurrentOne
     *
     * final:
     *
     */

    TABLE[i % 3] = TABLE[(i - 1) % 3] * (k - 1) + TABLE[(i - 2) % 3] * (k - 1);
  }
  return TABLE[n % 3];
};
