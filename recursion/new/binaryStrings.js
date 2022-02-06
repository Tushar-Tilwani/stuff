function binaryStrings(n) {
  const result = [];
  helper([], n, result);
  return result;
}

function helper(slate, n, result) {
  if (slate.length === n) {
    result.push(slate.join(""));
    return;
  }

  slate.push("0");
  helper(slate, n, result);
  slate.pop();

  slate.push("1");
  helper(slate, n, result);
  slate.pop();
}

console.log(binaryStrings(4));
