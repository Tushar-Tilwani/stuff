function extractList(list: number[][], suffix: string) {
  return list.reduce((acc, interval) => {
    const [start, end] = interval;
    acc.push([start, `s${suffix}`]);
    acc.push([end, `e${suffix}`]);
    return acc;
  }, [] as [number, string][]);
}

function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {
  const result = [];
  const sortedList = [...extractList(firstList, "1"), ...extractList(secondList, "2")].sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1].localeCompare(a[1]);
    }
    return a[0] - b[0];
  });
  console.log(sortedList);
  let hasSeenS1 = false;
  let hasSeenS2 = false;
  for (let i = 0; i < sortedList.length - 1; i++) {
    const [cVal, cDir] = sortedList[i];
    const [nVal, nDir] = sortedList[i + 1];
    if (cDir == "s1") {
      hasSeenS1 = true;
    }

    if (cDir == "e1") {
      hasSeenS1 = false;
    }

    if (cDir == "s2") {
      hasSeenS2 = true;
    }

    if (cDir == "e2") {
      hasSeenS2 = false;
    }

    if (
      (cDir === "s1" && nDir === "e2") ||
      (cDir === "s2" && nDir === "e1") ||
      (cDir === "s1" && nDir === "e1" && hasSeenS2) ||
      (cDir === "s2" && nDir === "e2" && hasSeenS1)
    ) {
      result.push([cVal, nVal]);
    }
  }
  return result;
}
