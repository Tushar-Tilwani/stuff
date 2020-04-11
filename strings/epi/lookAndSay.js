function lookAndSay(n) {
  const top = [[1]];
  let i = 0;
  while (i < n - 1) {
    const arr = helper(top[i]);
    top.push(arr);
    i++;
  }
  return top[n - 1].join("");
}

function helper(arr) {
  let i = 0;
  const result = [];
  let count = 1;
  while (i < arr.length) {
    if (arr[i] !== arr[i + 1]) {
      result.push(count);
      result.push(arr[i]);
      count = 1;
    } else {
      count++;
    }
    i++;
  }
  return result;
}

console.log(lookAndSay(6));
