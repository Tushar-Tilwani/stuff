function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {
  let i1 = 0;
  let i2 = 0;
  const result: number[][] = [];

  while (i1 < firstList.length && i2 < secondList.length) {
    const mergedInterval = getIntersection(firstList[i1], secondList[i2]);
    if (mergedInterval) {
      result.push(mergedInterval);
    }
    if (firstList[i1][1] < secondList[i2][1]) {
      i1++;
    } else {
      i2++;
    }
  }

  return result;
}

function getIntersection([start1, end1]: number[], [start2, end2]: number[]) {
  const startR = Math.max(start1, start2);
  const endR = Math.min(end1, end2);
  if (endR < startR) {
    return null;
  }
  return [startR, endR];
}
