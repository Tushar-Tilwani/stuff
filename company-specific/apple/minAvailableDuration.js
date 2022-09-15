/**
 * @param {number[][]} slots1
 * @param {number[][]} slots2
 * @param {number} duration
 * @return {number[]}
 */
var minAvailableDuration = function (slots1, slots2, duration) {
  const extractedValues = [...slots1, ...slots2]
    .reduce((acc, [start, end]) => {
      acc.push([start, "s"]);
      acc.push([end, "e"]);
      return acc;
    }, [])
    .sort((a, b) => a[0] - b[0]);

  let delta = 0;
  let prevVal = -1;
  for (let i = 0; i < extractedValues.length; i++) {
    const [value, type] = extractedValues[i];
    if (delta === 2 && type === "e" && value - prevVal >= duration) {
      return [prevVal, prevVal + duration];
    }
    delta = type === "e" ? delta - 1 : delta + 1;
    prevVal = value;
  }
  return [];
};
