const pattern = "(###) ###-###";
function getDisplayValue(str) {
  const result = [];
  let si = 0;
  let pi = 0;
  while (si < str.length && pi < pattern.length) {
    if (pattern[pi] === str[si]) {
      result.push(pattern[pi]);
      si++;
      pi++;
      continue;
    }

    const isNumber = Number.isFinite(parseInt(str[si]));
    if (!isNumber) {
      si++;
      continue;
    }

    while (pattern[pi] !== "#") {
      result.push(pattern[pi]);
      pi++;
    }
    result.push(str[si]);
    si++;
    pi++;
  }

  return result.join("");
}

console.log(getDisplayValue("12345678"));
console.log(getDisplayValue("1e23"));
console.log(getDisplayValue("(1e23)89"));
