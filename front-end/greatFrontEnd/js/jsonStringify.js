function jsonStringify(values) {
  const STACK = [];
  helper(values, STACK);
  return STACK.join("");
}

function helper(values, STACK) {
  if (Array.isArray(values)) {
    STACK.push(`[`);
    for (const value of values) {
      helper(value, STACK);
      STACK.push(`,`);
    }
    if (STACK[STACK.length - 1] === ",") STACK.pop();
    STACK.push(`]`);

    return;
  }

  if (typeof values === "object" && !!values) {
    const entries = Object.entries(values);
    STACK.push(`{`);
    for (const [key, objValue] of entries) {
      STACK.push(`"${key}":`);
      helper(objValue, STACK);
      STACK.push(`,`);
    }
    if (STACK[STACK.length - 1] === ",") STACK.pop();
    STACK.push(`}`);
    return;
  }

  if (typeof values === "string") {
    STACK.push(`"${values}"`);
    return;
  }

  STACK.push(`${values}`);
}

console.log(jsonStringify({ a: 1, b: [{ h: 1, i: "w" }, 2, 3, 4], c: "str" }));
console.log(jsonStringify({ a: null }));
