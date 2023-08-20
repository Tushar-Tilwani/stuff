function spiralTraverse(array) {
  // Write your code here.
  const result = [];
  let rStart = 0;
  let rEnd = array.length - 1;

  let cStart = 0;
  let cEnd = array[0].length - 1;

  while (cStart <= cEnd && rStart <= rEnd) {
    for (let i = cStart; i <= cEnd; i++) {
      result.push(array[rStart][i]);
    }
    rStart++;

    for (let i = rStart; i <= rEnd; i++) {
      result.push(array[i][cEnd]);
    }
    cEnd--;

    if (rEnd < rStart || cEnd < cStart) {
      continue;
    }

    for (let i = cEnd; i >= cStart; i--) {
      result.push(array[rEnd][i]);
    }
    rEnd--;

    for (let i = rEnd; i >= rStart; i--) {
      result.push(array[i][cStart]);
    }
    cStart++;
  }

  return result;
}

// Do not edit the line below.
exports.spiralTraverse = spiralTraverse;

const array = [[1], [2]];
console.log(spiralTraverse(array));
