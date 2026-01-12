function s(arr) {
  return arr.join(",");
}
function d(str) {
  return str.split(",").map((v) => parseInt(v));
}

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
  const MAX_ROWS = heights.length;
  const MAX_COLS = heights[0].length;
  // top-left
  const pacificSet = new Set();

  // right-bottom
  const atlanticSet = new Set();

  // left
  for (let i = 0; i < MAX_ROWS; i++) {
    let max = -Infinity;
    let prev = null;
    for (let j = 0; j < MAX_COLS; j++) {
      const curr = heights[i][j];
      if (curr > max || (curr === max && curr === prev)) {
        max = curr;
        pacificSet.add(s([i, j]));
      }
      prev = curr;
    }
  }

  // right
  for (let i = 0; i < MAX_ROWS; i++) {
    let max = -Infinity;
    for (let j = MAX_COLS - 1; j >= 0; j--) {
      const curr = heights[i][j];
      if (curr > max || (curr === max && curr === prev)) {
        max = curr;
        atlanticSet.add(s([i, j]));
      }
      prev = curr;
    }
  }

  // top
  for (let j = 0; j < MAX_COLS; j++) {
    let max = -Infinity;
    for (let i = 0; i < MAX_ROWS; i++) {
      const curr = heights[i][j];
      if (curr > max || (curr === max && curr === prev)) {
        max = curr;
        pacificSet.add(s([i, j]));
      }
      prev = curr;
    }
  }

  // bottom
  for (let j = 0; j < MAX_COLS; j++) {
    let max = -Infinity;
    for (let i = MAX_ROWS - 1; i >= 0; i--) {
      const curr = heights[i][j];
      if (curr > max || (curr === max && curr === prev)) {
        max = curr;
        atlanticSet.add(s([i, j]));
      }
      prev = curr;
    }
  }

  //   console.log(pacificSet, atlanticSet);

  const pacificAtlanticIntersection = [];
  for (const cell of atlanticSet.values()) {
    if (pacificSet.has(cell)) {
      pacificAtlanticIntersection.push(d(cell));
    }
  }

  return pacificAtlanticIntersection;
};
