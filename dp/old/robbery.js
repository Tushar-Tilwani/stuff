// Complete the maxStolenValue function below.
function maxStolenValue(values) {
  const len = values.length;
  if (len < 3) {
    return Math.max(values[0], values[1] || -1);
  }

  const DPTable = [values[0], values[1], values[2] + values[0]];

  for (let i = 3; i < len; i++) {
    DPTable[i] = values[i] + Math.max(DPTable[i - 2], DPTable[i - 3]);
  }
  return Math.max(DPTable[len - 1], DPTable[len - 2]);
}

console.log(maxStolenValue([6, 1, 2, 7]));
