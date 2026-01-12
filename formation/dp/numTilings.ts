// https://leetcode.com/problems/domino-and-tromino-tiling/

function numTilings(n: number): number {
  const TABLE = [1, 1, 2];
  for (let i = 3; i <= n; i++) {
    TABLE[i] = 2 * TABLE[i - 1] + TABLE[i - 3];
  }
  return TABLE[n];
}
