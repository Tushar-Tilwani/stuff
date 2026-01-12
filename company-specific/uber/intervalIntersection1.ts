const TYPE = {
  START: 0,
  END: 1,
};

function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {
  const mergedInterval = getMergedInterval(firstList, secondList);
  let count = 0;
  let previousStartVal = -1;
  const result = [];
  for (const [val, type] of mergedInterval) {
    if (type === TYPE.START) {
      previousStartVal = val;
      count++;
    }

    if (type === TYPE.END) {
      if (previousStartVal !== -1 && count > 1) {
        result.push([previousStartVal, val]);
      }
      previousStartVal = -1;
      count--;
    }
  }
  return result;
}

function getMergedInterval(firstList: number[][], secondList: number[][]) {
  return [...getExpandedInterval(firstList), ...getExpandedInterval(secondList)].sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });
}

function getExpandedInterval(list: number[][]) {
  return list.reduce((acc, [start, end]) => {
    acc.push([start, TYPE.START]);
    acc.push([end, TYPE.END]);
    return acc;
  }, [] as [number, number][]);
}
