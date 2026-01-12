function fractionToDecimal(numerator: number, denominator: number): string {
  const val = numerator / denominator;
  const strVal = `${val}`;
  if (strVal.length < 10) {
    return strVal;
  }
  const [int, decimal] = strVal.split(".");
  let result = null;
  let found = false;
  for (let len = 1; len <= 3; len++) {
    const subStr = decimal.substring(0, len);
    for (let i = len; i < strVal.length; i = i + len) {
      console.log(subStr, decimal.substring(i, i + len));
    }
  }

  return result === null ? `${val}` : `${int}.(${result})`;
}
