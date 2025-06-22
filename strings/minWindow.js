/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  let result = null;
  const strArr = s.split("");
  const tArr = t.split("");
  const len = strArr.length;

  const map = getCleanMap(tArr);
  let left = 0;
  let right = 0;
  let missingValues = Object.values(map).reduce((acc, v) => acc + v, 0);

  while (right <= len) {
    let righVal = strArr[right];
    let leftVal = strArr[left];

    if (missingValues === 0) {
      if (!result || result.length > right - left) {
        result = strArr.slice(left, right).join("");
      }

      if (Number.isFinite(map[leftVal])) {
        map[leftVal] += 1;
        if (map[leftVal] > 0) {
          // some of the vlaues have become 1
          missingValues += 1;
        }
      }

      left++;
    } else {
      if (Number.isFinite(map[righVal])) {
        map[righVal] -= 1;
        if (map[righVal] >= 0) {
          missingValues -= 1;
        }
      }
      right++;
    }
  }
  return result || "";
};

function getCleanMap(t) {
  return t.reduce((acc, v) => {
    acc[v] = acc[v] + 1 || 1;
    return acc;
  }, {});
}

function checkEquality(map) {
  return !Object.values(map).some(v => v > 0);
}

console.log(minWindow("ADOBECODEBANC", "ABC"));
