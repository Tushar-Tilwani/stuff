/**
 * // Definition for an Interval.
 * function Interval(start, end) {
 *    this.start = start;
 *    this.end = end;
 * };
 */

/**
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 */
function employeeFreeTime(schedule) {
  const intervals = schedule.reduce(
    (acc, schedule) => [
      ...acc,
      ...schedule.reduce((accInner, interval) => {
        accInner.push([interval.start, "s"]);
        accInner.push([interval.end, "e"]);
        return accInner;
      }, []),
    ],
    []
  );
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];

  let lastEnd = -Infinity;

  let startEndBalance = 0;
  for (let i = 0; i < intervals.length; i++) {
    const [, prevType] = intervals[i - 1] ?? [];
    const [val, currType] = intervals[i];
    if (currType === "e") {
      lastEnd = Math.max(lastEnd, val);
      startEndBalance--;
    }

    if (
      prevType === "e" &&
      currType === "s" &&
      startEndBalance === 0 &&
      // Same values are zero intervals
      lastEnd !== val
    ) {
      result.push(new Interval(lastEnd, val));
    }

    if (currType === "s") {
      startEndBalance++;
    }
  }

  return result;
}
