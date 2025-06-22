function flatten(arr) {
  let i = 0;
  const QUEUE = arr.slice(0);
  const result = [];
  while (QUEUE.length > 0) {
    const val = QUEUE.shift();
    if (Array.isArray(val)) {
      QUEUE.push(...val);
    } else {
      result.push(val);
    }
  }
  return result;
}

console.log(flatten([[1, [2, [3]]]]));
