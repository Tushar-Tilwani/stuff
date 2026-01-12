function removeOuterParentheses(s: string): string {
  const result: string[] = [];
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      count++;
    } else {
      count--;
    }
    if ((count === 1 && s[i] === ")") || (count === 0 && s[i] === "(")) {
      continue;
    }
    result.push(s[i]);
  }

  return result.join("");
}
