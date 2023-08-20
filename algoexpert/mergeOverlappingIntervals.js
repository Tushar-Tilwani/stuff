function mergeOverlappingIntervals(array) {
  // Write your code here.
  const sortedIntervals = array
    .reduce((acc, [start, end]) => {
      acc.push([start, "s"]);
      acc.push([end, "e"]);
      return acc;
    }, [])
    .sort(([t1, ty1], [t2, ty2]) => {
      if (t1 === t2) {
        return ty2.localeCompare(ty1);
      }
      return t1 - t2;
    });
  const result = [];
  const STACK = [];
  for (let i = 0; i < sortedIntervals.length; i++) {
    const interval = sortedIntervals[i];
    const [eTime, type] = interval;
    if (type === "s") {
      STACK.push(interval);
    }
    if (type === "e") {
      const [sTime] = STACK.pop();
      if (STACK.length === 0) {
        result.push([sTime, eTime]);
      }
    }
  }
  return result;
}

// Do not edit the line below.
exports.mergeOverlappingIntervals = mergeOverlappingIntervals;
