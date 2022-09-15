/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  for (let i = index; i < flowerbed.length; i++) {
    const canPlace =
      (flowerbed[i - 1] === 0 || i === 0) &&
      (flowerbed[i + 1] === 0 || i === flowerbed.length - 1) &&
      flowerbed[i] === 0;
    if (canPlace) {
      flowerbed[i] = 1;
      count++;
    }
  }
  return count > n;
};
