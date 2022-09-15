/**
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
  let prev = points[0];
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = prev;
    const [x2, y2] = points[i];
    result += Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
    prev = points[i];
  }
  return result;
};
