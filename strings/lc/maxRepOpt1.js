// https://leetcode.com/problems/swap-for-longest-repeated-character-substring/
// Need spaced repteation 
/**
 * @param {string} text
 * @return {number}
 */
var maxRepOpt1 = function(text) {
  const charArr = text.split("");

  const charPositionMap = charArr.reduce((map, val, index) => {
    if (map.has(val)) {
      map.get(val).push(index);
    } else {
      map.set(val, [index]);
    }
    return map;
  }, new Map());

  const positionsArray = charPositionMap.values();
  let result = 0;

  for (const positions of positionsArray) {
    const len = positions.length;
    let prev = 0,
      curr = 1,
      sum = 0;

    for (let i = 1; i <= len; i++) {
      if (positions[i] === positions[i - 1] + 1) {
        curr += 1;
      } else {
        sum = Math.max(sum, curr + prev);
        if (positions[i] === positions[i - 1] + 2) {
          prev = curr;
          curr = 1;
        } else {
          prev = 0;
          curr = 1;
        }
      }
    }
    // console.log(sum, len);
    // sum = Math.max(sum, curr + prev);
    sum = sum < len ? sum + 1 : sum;
    result = Math.max(result, sum);
  }
  return result;
};

let text = "aaabaaa";
// text = "baabaaabbbabaabaab";
console.log(maxRepOpt1(text));
