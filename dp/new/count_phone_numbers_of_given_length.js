const moveMap = {
  1: [8, 6],
  2: [7, 9],
  3: [8, 4],
  4: [3, 9, 0],
  5: [],
  6: [1, 7, 0],
  7: [2, 6],
  8: [1, 3],
  9: [4, 2],
  0: [4, 6],
};

/**
 * @param {int32} startdigit
 * @param {int32} phonenumberlength
 * @return {int64}
 */
function count_phone_numbers_of_given_length(startdigit, phonenumberlength) {
  const memo = new Map();
  // Write your code here.
  return helper(startdigit, phonenumberlength, memo);
}

function helper(digit, len, memo) {
  const key = digit + "::" + len;
  if (memo.has(key)) {
    return memo.get(key);
  }
  if (len === 1) {
    return 1;
  }
  let result = 0;
  const neighbhours = moveMap[digit];
  for (const neighbhour of neighbhours) {
    result += helper(neighbhour, len - 1, memo);
  }
  memo.set(key, result);
  return result;
}
