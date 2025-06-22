/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
  let [localMin, localMax] = sortedIntervals[0];
  const result = [];
  for (let i = 1; i <= sortedIntervals.length; i++) {
    const [start, end] = sortedIntervals[i] ?? [];
    if (start <= localMax) {
      localMin = Math.min(start, localMin);
      localMax = Math.max(end, localMax);
    } else {
      result.push([localMin, localMax]);
      localMin = start;
      localMax = end;
    }
  }

  return result;
}

let intervals = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];

intervals = [
  [1, 4],
  [4, 5],
];

console.log(merge(intervals));
