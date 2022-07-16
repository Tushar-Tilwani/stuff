const average = (array) =>
  Math.floor(array.reduce((a, b) => a + b) / array.length);
/**
 * @param {number[][]} items
 * @return {number[][]}
 */
var highFive = function (items) {
  const scoreMap = items.reduce((map, [id, score]) => {
    if (!map.has(id)) {
      map.set(id, []);
    }
    map.get(id).push(score);
    return map;
  }, new Map());

  return Array.from(scoreMap.entries())
    .map(([id, scores]) => [
      id,
      average(scores.sort((a, b) => b - a).slice(0, 5)),
    ])
    .sort(([id1], [id2]) => id1 - id2);
};
