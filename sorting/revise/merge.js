/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
  if (intervals.length === 0) {
    return 0;
  }
  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);

  // console.log(sortedIntervals);
  const len = sortedIntervals.length - 1;
  let result = 1;
  let [start1, end1] = sortedIntervals[i];

  for (let i = 1; i < len; i++) {
    const [start2, end2] = sortedIntervals[i];
    if (start2 < end1) {
      result++;
    }

    if (end1 - start1 > end2 - start2) {
    }
  }

  return result;
};
