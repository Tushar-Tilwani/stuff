/**
 * @param {int32} pixel_row
 * @param {int32} pixel_column
 * @param {int32} new_color
 * @param {list_list_int32} image
 * @return {list_list_int32}
 */
function flood_fill(pixel_row, pixel_column, new_color, image) {
  const MAX_ROW = image.length;
  const MAX_COL = image[0].length;
  const visited = new Array(MAX_ROW).fill().map(() => new Array(MAX_COL).fill(false));
  visited[pixel_row][pixel_column] = true;
  image[pixel_row][pixel_column] = new_color;
  dfs(image, pixel_row, pixel_column, new_color, visited);
  // Write your code here.
  return image;
}

function dfs(image, row, col, color, visited) {
  const neighbours = getNeighbours(image, row, col, color);
  for (const [nRow, nCol] of neighbours) {
    if (visited[nRow][nCol]) {
      continue;
    }
    image[nRow][nCol] = color;
    visited[nRow][nCol] = true;
    dfs(image, nRow, nCol, color, visited);
  }
}

function getNeighbours(image, row, col, color) {
  const MAX_ROW = image.length;
  const MAX_COL = image[0].length;
  const result = [];

  if (row + 1 < MAX_ROW && image[row + 1][col] === color) {
    result.push([row + 1, col]);
  }

  if (col + 1 < MAX_COL && image[row][col + 1] === color) {
    result.push([row, col + 1]);
  }

  if (row - 1 >= 0 && image[row - 1][col] === color) {
    result.push([row - 1, col]);
  }

  if (col - 1 >= 0 && image[row][col - 1] === color) {
    result.push([row, col - 1]);
  }

  return result;
}
