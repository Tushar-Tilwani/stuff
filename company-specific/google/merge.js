/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const allValues = intervals.reduce((acc, [s, e]) => {
    acc.push([s, "s"]);
    acc.push([e, "e"]);
    return acc;
  }, []);

  const sortedTimes = allValues.sort(([val1, type1], [val2, type2]) => {
    if (val1 === val2) {
      return type2.localeCompare(type1);
    }
    return val1 - val2;
  });

  console.log(sortedTimes);

  let counter = 0;
  let prev = [];
  const result = [];
  for (const [time, type] of sortedTimes) {
    if (type === "s") {
      if (counter === 0) {
        prev.push(time);
      }
      counter++;
      continue;
    }
    // end
    counter--;
    if (counter === 0) {
      prev.push(time);
      result.push(prev);
      prev = [];
    }
  }
  return result;
};
