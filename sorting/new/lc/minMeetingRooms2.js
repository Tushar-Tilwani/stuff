//https://leetcode.com/problems/meeting-rooms-ii/
/**
 * @param {number[][]} intervals
 * @return {number}
 * This shockingly simple solution is from EPI 13.3
 */
var minMeetingRooms = function (intervals) {
  const sortedPoints = intervals
    // 0=> start , 1=> end
    .reduce((acc, interval) => [...acc, [interval[0], 0], [interval[1], 1]], [])
    .sort((a, b) => {
      if (a[0] === b[0]) {
        return b[1] - a[1];
      }
      return a[0] - b[0];
    });

  let result = 1;
  let currentRoom = 0;
  for (const [, type] of sortedPoints) {
    currentRoom = type === 0 ? currentRoom + 1 : currentRoom - 1;
    result = Math.max(result, currentRoom);
  }

  return [result, sortedPoints];
};

let intervals = [
  [0, 30],
  [5, 10],
  [15, 20],
];

intervals = [
  [13, 15],
  [1, 13],
];

console.log("minMeetingRooms", minMeetingRooms(intervals));
