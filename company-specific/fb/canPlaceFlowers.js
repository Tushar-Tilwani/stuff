/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  return canDo(flowerbed, n, 0, new Map());
};

function canDo(flowerbed, n, index, memo) {
  const key = `${n}${index}`;
  // console.log(key, memo);
  if (memo.has(key)) {
    return memo.get(key);
  }
  if (n === 0) {
    memo.set(key, true);
    return memo.get(key);
  }
  if (index >= flowerbed.length) {
    memo.set(key, false);
    return memo.get(key);
  }
  for (let i = index; i < flowerbed.length; i++) {
    const newKey = `${n - 1}${i + 1}`;
    if (memo.has(newKey)) {
      continue;
    }
    const canPlace =
      (flowerbed[i - 1] === 0 || i === 0) &&
      (flowerbed[i + 1] === 0 || i === flowerbed.length - 1) &&
      flowerbed[i] === 0;
    if (!canPlace) {
      memo.set(newKey, false);
      continue;
    }
    flowerbed[i] = 1;
    const result = canDo(flowerbed, n - 1, i + 1, memo);
    flowerbed[i] = 0;
    if (result) {
      memo.set(key, true);
      return memo.get(key);
    }
  }
  memo.set(key, false);
  return memo.get(key);
}
