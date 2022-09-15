/**
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents = function (events) {
  const sortedEvents = events.sort(([start1, end1], [start2, end2]) => {
    return start1 + end1 - (start2 + end2);
  });

  let result = 1;
  for (const [start, end] of sortedEvents) {
    if (start <= result && result <= end) {
      result++;
    }
  }
  return result - 1;
};
