type Type = "s" | "e";
function merge(intervals: number[][]): number[][] {
  const values = intervals.reduce((acc, [start, end]) => {
    acc.push([start, "s"]);
    acc.push([end, "e"]);
    return acc;
  }, [] as [number, string][]);
  const sortedValues = values.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1].localeCompare(a[1]);
    }
    return a[0] - b[0];
  });
  console.log(sortedValues);
  const result = [];
  let count = 0;
  let left = Infinity;
  for (let i = 0; i < sortedValues.length; i++) {
    const [time, type] = sortedValues[i];
    if (type === "s") {
      left = Math.min(left, time);
      count += 1;
    } else {
      count -= 1;
      if (count === 0) {
        result.push([left, time]);
        left = Infinity;
      }
    }
  }
  return result;
}
