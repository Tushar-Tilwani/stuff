const TYPE = {
  START: 1,
  END: 0,
};

function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {
  const mergedIntervals = firstList
    .concat(secondList)
    .reduce((acc, [start, end]) => {
      acc.push([start, TYPE.START]);
      acc.push([end, TYPE.END]);
      return acc;
    }, [] as [number, number][])
    .sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
  console.log(mergedIntervals);
  let previousType: number = -1;
  //line sweep
  let start: number | null = null;
  const result: number[][] = [];
  let prevTime = null;
  let count = 0;
  for (const [currentTime, currentType] of mergedIntervals) {
    if (previousType === TYPE.START && currentType === TYPE.END && count > 0 && prevTime != null) {
      result.push([prevTime, currentTime]);
    }
    previousType = currentType;
    prevTime = currentTime;
    count += currentType === TYPE.START ? 1 : -1;
  }
  return result;
}
