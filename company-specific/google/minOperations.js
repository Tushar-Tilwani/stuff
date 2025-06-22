/**
 * @param {string} boxes
 * @return {number[]}
 */
var minOperations = function (boxes) {
  const oneIndicies = [];
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i] == "1") {
      oneIndicies.push(i);
    }
  }

  const result = new Array(boxes.length).fill(0);
  for (let i = 0; i < result.length; i++) {
    let localOperations = 0;
    for (const index of oneIndicies) {
      localOperations += Math.abs(index - i);
    }
    result[i] = localOperations;
  }

  return result;
};
