function fractionToDecimal(numerator: number, denominator: number): string {
  if (numerator === 0) {
    return "0";
  }
  let isNeg = numerator * denominator < 0;
  numerator = Math.abs(numerator);
  const result = [];
  let tries = Math.pow(10, 4);
  let dotAdded = false;
  const remainderMap = new Map();
  while (numerator > 0 && tries > 0) {
    const div = Math.floor(numerator / denominator);
    result.push(div);
    if (!dotAdded && numerator % denominator !== 0) {
      result.push(".");
      dotAdded = true;
    }
    numerator = (numerator % denominator) * 10;
    if (remainderMap.has(numerator)) {
      const index = remainderMap.get(numerator) as number;
      result.splice(index, 0, "(");
      result.push(")");
      break;
    }
    remainderMap.set(numerator, result.length);
    tries--;
  }

  if (isNeg) {
    result.splice(0, 0, "-1");
  }

  return result.join("");
}
