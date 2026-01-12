type Log = { start: number; end: number; profit: number };
function jobScheduling(startTime: number[], endTime: number[], profits: number[]): number {
  const alls = startTime
    .reduce((acc, _, i) => {
      acc.push({ start: startTime[i], end: endTime[i], profit: profits[i] });
      return acc;
    }, [] as Log[])
    .sort((a, b) => {
      if (a.end === b.end) {
        if (b.profit === a.profit) {
          return a.start - b.start;
        }
        return b.profit - a.profit;
      }
      return a.end - b.end;
    });
  console.log(alls);
  const TABLE = new Array(alls.length).fill(0);
  TABLE[0] = alls[0].profit;
  for (let currIndex = 1; currIndex < alls.length; currIndex++) {
    const skipProfit = TABLE[currIndex - 1];
    const prevIndex = getLastNonConflictingJob(alls, currIndex);
    const prevNonConflictProfit = prevIndex >= 0 ? TABLE[prevIndex] : 0;
    const takeProfit = alls[currIndex].profit + prevNonConflictProfit;
    TABLE[currIndex] = Math.max(skipProfit, takeProfit);
  }

  console.log(TABLE);

  return Math.max(...TABLE);
}

function getLastNonConflictingJob(alls: Log[], current: number) {
  let start = 0;
  let end = current - 1;
  //    Math.max(alls[prevIndex].start, alls[currIndex].start) < Math.min(alls[prevIndex].end, alls[currIndex].end)

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (Math.max(alls[mid].start, alls[current].start) < Math.min(alls[mid].end, alls[current].end)) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end;
}
