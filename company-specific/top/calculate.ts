const PRIORITY = [
  ["/", "*"],
  ["-", "+"],
];
// /[\/\*\-\+]/
function calculate(s: string): number {
  let result = cleanString(s);
  let opIndex = 0;
  while (opIndex < PRIORITY.length) {
    let newResult = [];
    const ops = PRIORITY[opIndex];
    let i = 0;
    while (i < result.length) {
      if (!ops.includes(result[i] as string)) {
        newResult.push(result[i]);
        i += 1;
        continue;
      }
      const op = result[i];
      const val1 = newResult.pop() as number;
      const val2 = result[i + 1] as number;
      if (op === "/") newResult.push(Math.floor(val1 / val2));
      if (op === "*") newResult.push(val1 * val2);
      if (op === "+") newResult.push(val1 + val2);
      if (op === "-") newResult.push(val1 - val2);
      i += 2;
    }
    result = newResult;
    console.log("result", result);
    opIndex += 1;
  }

  return result[0] as number;
}

function cleanString(s: string) {
  let chars = s.split("").filter((char) => char !== " ");
  let result: (string | number)[] = [];
  let i = 0;
  let prev = [];
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (PRIORITY[0].includes(char) || PRIORITY[1].includes(char)) {
      result.push(parseInt(prev.join("")));
      result.push(char);
      prev = [];
      continue;
    }
    prev.push(char);
  }
  result.push(parseInt(prev.join("")));
  return result;
}
