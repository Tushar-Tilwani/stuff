function minMeetingRooms(intervals: number[][]): number {
  const times = intervals
    .reduce((acc, [start, end]) => {
      acc.push([start, "s"]);
      acc.push([end, "e"]);
      return acc;
    }, [] as [number, string][])
    .sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1].localeCompare(b[1]);
      }
      return a[0] - b[0];
    });
  let result = 0;
  let count = 0;
  for (const [time, type] of times) {
    if (type === "s") {
      count += 1;
      result = Math.max(result, count);
    } else {
      count -= 1;
    }
  }

  return result;
}
