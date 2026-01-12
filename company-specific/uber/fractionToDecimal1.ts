function fractionToDecimal(numerator: number, denominator: number): string {
  const sign = numerator * denominator < 0 ? "-" : "";
  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);
  if (numerator === 0) {
    return "0";
  }
  const digits: (number | string)[] = [];
  let i = 0;
  let decimalAdded = false;
  const numerator_map = new Map<number, number>();
  while (i < 10_000) {
    const top = Math.floor(numerator / denominator);
    digits.push(top);

    numerator = (numerator % denominator) * 10;
    if (numerator === 0) {
      break;
    }
    if (!decimalAdded) {
      digits.push(".");
      decimalAdded = true;
    }
    if (numerator_map.has(numerator)) {
      const index = numerator_map.get(numerator)!;
      digits.splice(index, 0, "(");
      digits.push(")");
      break;
    }
    numerator_map.set(numerator, digits.length);
    i++;
  }

  return `${sign}${digits.join("")}`;
}
