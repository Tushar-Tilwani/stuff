/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const STACK = [];
  const result = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "]") {
      STACK.push(s[i]);
      continue;
    }
    const tempStr = [];
    let char;
    while ((char = STACK.pop()) !== "[") {
      tempStr.push(char);
    }
    const tempNum = [];
    while (/^\d+$/.test(STACK[STACK.length - 1])) {
      tempNum.push(STACK.pop());
    }
    const times = parseInt(tempNum.reverse().join(""));

    const str = tempStr.reverse().join("");
    for (let j = 0; j < times; j++) {
      STACK.push(str);
    }
    console.log(STACK);
  }

  return STACK.join("");
};
