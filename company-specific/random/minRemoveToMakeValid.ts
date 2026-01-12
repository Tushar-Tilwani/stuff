function minRemoveToMakeValid(s: string): string {
  const result = [];
  let balance = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      balance++;
    }
    if (s[i] === ")") {
      balance--;
    }
    if (balance >= 0) {
      result.push(s[i]);
    }
    if (balance < 0) {
      balance = 0;
    }
  }

  let end = result.length - 1;
  while (balance > 0) {
    if (result[end] === "(") {
      result[end] = "";
      balance--;
    }
    end--;
  }

  console.log(result);

  return result.join("");
}
