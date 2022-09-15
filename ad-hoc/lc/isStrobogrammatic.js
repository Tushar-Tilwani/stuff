const MAP = new Map([
  [6, 9],
  [9, 6],
  [0, 0],
  [8, 8],
]);
/**
 * @param {string} num
 * @return {boolean}
 */
var isStrobogrammatic = function (num) {
  const result = [];
  for (let i = 0; i < num.length; i++) {
    result.push(MAP.get(num[i]) ?? "_");
  }
  return result.join("") === num;
};
