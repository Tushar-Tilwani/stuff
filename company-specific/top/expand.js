/**
 * @param {string} s
 * @return {string[]}
 */
var expand = function (s) {
  const parsed = [];
  const STACK = [];

  let inBraceChars = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ",") {
      continue;
    }
    if (s[i] === "}") {
      const interimResult = [];
      let char = STACK.pop();
      while (char !== "{" && STACK.length > 0) {
        interimResult.push(char);
        char = STACK.pop();
      }
      parsed.push(interimResult.reverse());
      inBraceChars = false;
      continue;
    }

    if (s[i] === "{") {
      inBraceChars = true;
    }

    if (inBraceChars) {
      STACK.push(s[i]);
    } else {
      parsed.push(s[i]);
    }
  }

  const result = [];
  dfs(parsed, 0, [], result);
  return result.sort((a, b) => a.localeCompare(b));
};

function dfs(items, index, slate, result) {
  if (index === items.length) {
    result.push(slate.join(""));
    return;
  }
  const item = items[index];
  if (!Array.isArray(item)) {
    slate.push(item);
    dfs(items, index + 1, slate, result);
    slate.pop();
    return;
  }

  for (const sItem of item) {
    slate.push(sItem);

    dfs(items, index + 1, slate, result);
    slate.pop();
  }
}
