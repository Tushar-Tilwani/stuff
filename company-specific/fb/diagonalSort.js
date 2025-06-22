/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var diagonalSort = function (mat) {
  const valuesMap = new Map();
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      const key = i - j;
      if (!valuesMap.has(key)) {
        valuesMap.set(key, []);
      }
      valuesMap.get(key).push(mat[i][j]);
    }
  }
  for (const key of valuesMap.keys()) {
    valuesMap.get(key).sort((a, b) => b - a);
  }

  const result = [];
  for (let i = 0; i < mat.length; i++) {
    result[i] = [];
    for (let j = 0; j < mat[i].length; j++) {
      const key = i - j;
      result[i][j] = valuesMap.get(key).pop();
    }
  }

  return result;
};
