const getMap = (str) =>
  str.split("").reduce(
    (map, val) => {
      map.set(val, map.get(val) + 1);
      return map;
    },
    new Map([
      ["0", 0],
      ["1", 0],
    ])
  );

const findResult = (strs, path, index, m, n, result) => {
  if (index === strs.length) {
    const map = getMap(path.join(""));
    if (map.get("0") <= m && map.get("1") <= n) {
      result[0] = Math.max(result[0], path.length);
    }
    return;
  }

  findResult(strs, path, index + 1, m, n, result);

  path.push(strs[index]);
  findResult(strs, path, index + 1, m, n, result);
  path.pop();
};

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const result = [0];
  findResult(strs, [], 0, m, n, result);
  return result[0];
};

const strs = ["10", "0001", "111001", "1", "0"],
  m = 5;
n = 3;

console.log(findMaxForm(strs, m, n));
