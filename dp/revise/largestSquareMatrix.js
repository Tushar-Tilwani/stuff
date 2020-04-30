// @param n : number of rows in mat
// @param m : number of columns in mat
// @param mat: 2D matrix of zeros and ones
function largest_sub_square_matrix(n, m, mat) {
  // Write your code here
  const DP_TABLE = [];
  let result = 0;

  // Initialize Table
  for (let i = 0; i < n; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j < m; j++) {
      DP_TABLE[i][j] = 0;
    }
  }

  for (let i = 0; i < n; i++) {
    DP_TABLE[i][0] = mat[i][0];
  }

  for (let j = 0; j < m; j++) {
    DP_TABLE[0][j] = mat[0][j];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      const min = Math.min(
        DP_TABLE[i - 1][j - 1],
        DP_TABLE[i][j - 1],
        DP_TABLE[i - 1][j]
      );
      if (mat[i - 1][j - 1] && mat[i][j - 1] && mat[i - 1][j] && mat[i][j]) {
        DP_TABLE[i][j] = min + 1;
      } else {
        DP_TABLE[i][j] = mat[i][j];
      }
      result = Math.max(DP_TABLE[i][j], result);
    }
  }
  return result;
}

var mat = [
  [1, 0, 0, 1],
  [0, 1, 1, 1],
  [0, 1, 1, 1],
  
];
console.log(largest_sub_square_matrix(mat.length, mat[0].length, mat));
