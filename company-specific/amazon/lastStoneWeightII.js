var lastStoneWeightII = function (stones) {
  const result = [Infinity];
  tryAll(stones, result, new Map());
  return result[0];
};

function tryAll(stones, result, memo) {
  const key = [...stones].sort().join();
  if (memo.has(key)) {
    return memo.get(key);
  }
  if (stones.length === 1) {
    result[0] = Math.min(result[0], stones[0]);
    memo.set(key, result[0]);
    return result[0];
  }

  if (stones.length === 0 || result[0] === 0) {
    result[0] = Math.min(result[0], 0);
    memo.set(key, result[0]);
    return result[0];
  }

  for (let i = 0; i < stones.length; i++) {
    for (let j = i + 1; j < stones.length; j++) {
      swap(stones, i, stones.length - 1);
      swap(stones, j, stones.length - 2);
      const stone1 = stones.pop();
      const stone2 = stones.pop();
      const diff = Math.abs(stone1 - stone2);
      if (diff > 0) {
        stones.push(diff);
      }

      if (memo.has([...stones].sort().join())) {
        console.log(stones);
        return;
      }
      tryAll(stones, result, memo);
      if (diff > 0) {
        stones.pop();
      }
      stones.push(stone2);
      stones.push(stone1);
      swap(stones, j, stones.length - 2);
      swap(stones, i, stones.length - 1);
    }
  }
  memo.set(key, result[0]);
  return result[0];
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
