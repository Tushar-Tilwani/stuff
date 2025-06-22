/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let [localMin, localMax] = newInterval;
  let result = [];
  let i = 0;
  const len = intervals.length;

  while (i < len && intervals[i][1] < localMin) {
    result.push(intervals[i]);
    i++;
  }

  while (i < len && intervals[i][0] <= localMax) {
    const [start, end] = intervals[i];
    localMin = Math.min(localMin, start);
    localMax = Math.max(localMax, end);
    i++;
  }

  result.push([localMin, localMax]);

  while (i < len) {
    result.push(intervals[i]);
    i++;
  }

  //   for (let i = 0; i <= intervals.length; i++) {
  //     const [start, end] = intervals[i] ?? [];
  //     if (end < localMin) {
  //       result.push([start, end]);
  //     } else if (i === intervals.length || start > localMax) {
  //       result.push([localMin, localMax]);
  //       localMin = start;
  //       localMax = end;
  //     } else {
  //       localMin = Math.min(localMin, start);
  //       localMax = Math.max(localMax, end);
  //     }
  //   }

  return result;
};

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert_forLoop = function (intervals, newInterval) {
  let [localMin, localMax] = newInterval;
  for (let i = 0; i <= intervals.length; i++) {
    const [start, end] = intervals[i] ?? [];
    if (end < localMin) {
      result.push([start, end]);
    } else if (i === intervals.length || start > localMax) {
      result.push([localMin, localMax]);
      localMin = start;
      localMax = end;
    } else {
      localMin = Math.min(localMin, start);
      localMax = Math.max(localMax, end);
    }
  }

  return result;
};

let intervals = [
    [1, 2],
    [3, 5],
    [6, 7],
    [8, 10],
    [12, 16],
    [18, 20],
  ],
  newInterval = [4, 8];

console.log(insert(intervals, newInterval));
