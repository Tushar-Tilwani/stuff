function baseConversion(str, b1, b2) {
  if (str === "0") {
    return "0";
  }
  let startIndex = 0;
  let sign = 1;

  if (str.charAt(0) === "-") {
    startIndex = 1;
    sign = -1;
  }
  if (str.charAt(0) === "+") {
    startIndex = 1;
  }

  let base10 = 0;
  for (let i = startIndex; i < str.length; i++) {
    base10 = base10 * b1;
    base10 += getDigitValue(str[i]);
  }

  const result = [];
  while (base10 > 0) {
    const digit = base10 % b2;
    result.push(getCharValue(digit));
    base10 = Math.floor(base10 / b2);
  }

  if (sign === -1) {
    result.push("-");
  }
  return result.reverse().join("");
}

function getDigitValue(char) {
  const zeroAsciiValue = "0".charCodeAt(0);
  let value = char.charCodeAt(0) - zeroAsciiValue;
  if (value < 10) {
    return value;
  }

  const capAValue = "A".charCodeAt(0);
  value = char.charCodeAt(0) - capAValue + 10;

  if (value < 17) {
    return value;
  }

  throw new Error("Invalid Digit");
}

function getCharValue(digit) {
  if (digit < 10) {
    return digit + "";
  }
  const capAValue = "A".charCodeAt(0);
  const offset = digit - 10;

  return String.fromCharCode(offset + capAValue);
}

console.log(baseConversion("2", 7, 13));
