/**
 * @param {number[][]} items
 * @return {number[][]}
 */
var highFive = function (items) {
  const map = new Map();
  for (const [id, score] of items) {
    if (!map.has(id)) {
      map.set(id, []);
    }
    map.get(id).push(score);
  }

  const sum = (acc, val) => acc + val;
  const result = [];
  for (const [id, scores] of map.entries()) {
    const sortedScores = scores.sort((a, b) => b - a);
    const avg = Math.floor(sortedScores.slice(0, 5).reduce(sum, 0) / 5);
    result.push([id, avg]);
  }

  return result.sort((a, b) => a[0] - b[0]);
};
