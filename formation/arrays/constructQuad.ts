/**
 * Definition for _Node.
 * class _Node {
 *     val: boolean
 *     isLeaf: boolean
 *     topLeft: _Node | null
 * 	topRight: _Node | null
 * 	bottomLeft: _Node | null
 * 	bottomRight: _Node | null
 * 	constructor(val?: boolean, isLeaf?: boolean, topLeft?: _Node, topRight?: _Node, bottomLeft?: _Node, bottomRight?: _Node) {
 *         this.val = (val===undefined ? false : val)
 *         this.isLeaf = (isLeaf===undefined ? false : isLeaf)
 *         this.topLeft = (topLeft===undefined ? null : topLeft)
 *         this.topRight = (topRight===undefined ? null : topRight)
 *         this.bottomLeft = (bottomLeft===undefined ? null : bottomLeft)
 *         this.bottomRight = (bottomRight===undefined ? null : bottomRight)
 *   }
 * }
 */

class _Node {
  val: boolean;
  isLeaf: boolean;
  topLeft: _Node | null;
  topRight: _Node | null;
  bottomLeft: _Node | null;
  bottomRight: _Node | null;

  constructor(
    val?: boolean,
    isLeaf?: boolean,
    topLeft?: _Node | null,
    topRight?: _Node | null,
    bottomLeft?: _Node | null,
    bottomRight?: _Node | null
  ) {
    this.val = val === undefined ? false : val;
    this.isLeaf = isLeaf === undefined ? false : isLeaf;
    this.topLeft = topLeft === undefined ? null : topLeft;
    this.topRight = topRight === undefined ? null : topRight;
    this.bottomLeft = bottomLeft === undefined ? null : bottomLeft;
    this.bottomRight = bottomRight === undefined ? null : bottomRight;
  }
}

function construct(grid: number[][]): _Node | null {
  return helper(grid, 0, grid.length - 1, 0, grid[0].length - 1);
}

function helper(
  grid: number[][],
  rStart: number,
  rEnd: number,
  cStart: number,
  cEnd: number
): _Node | null {
  if (rEnd < rStart || cEnd < cStart) {
    return null;
  }
  if (rEnd === rStart && cEnd === cStart) {
    return new _Node(grid[rStart][cStart] === 1, true);
  }

  const rMid = Math.floor((rEnd - rStart) / 2) + rStart;
  const cMid = Math.floor((cEnd - cStart) / 2) + cStart;
  const topLeft = helper(grid, rStart, rMid - 1, cStart, cMid - 1);
  const topRight = helper(grid, rStart, rMid - 1, cMid + 1, cEnd);
  const bottomLeft = helper(grid, rMid + 1, rEnd, cStart, cMid - 1);
  const bottomRight = helper(grid, rMid + 1, rEnd, cMid + 1, cEnd);

  if (topLeft?.isLeaf && topRight?.isLeaf && bottomLeft?.isLeaf && bottomRight?.isLeaf) {
    if (topLeft.val === topRight.val && topRight.val === bottomRight.val && bottomRight.val === bottomLeft.val) {
      // found leaf
      return new _Node(topLeft.val, true);
    }
  }
  return new _Node(topLeft?.val, false, topLeft, topRight, bottomLeft, bottomRight);
}
