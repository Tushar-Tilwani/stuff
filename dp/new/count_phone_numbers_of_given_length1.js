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
  const MAX_DIGITS = 10;
  const TABLE = new Array(phonenumberlength + 1)
    .fill()
    .map(() => new Array(MAX_DIGITS).fill(0));

  for (let j = 0; j < MAX_DIGITS; j++) {
    TABLE[1][j] = 1;
  }

  for (let partialLen = 2; partialLen <= phonenumberlength; partialLen++) {
    for (let digit = 0; digit < MAX_DIGITS; digit++) {
      const nDigits = moveMap[digit];
      // Every digit looks at neighboring digits looks at len -1
      // So example currentDigit = 1. Neighbors = [6,8]
      // 6 (2 ways), 8 (3 ways) => 2+3 => 5 ways
      for (const nDigit of nDigits) {
        TABLE[partialLen][digit] += TABLE[partialLen - 1][nDigit];
      }
    }
  }

  return TABLE[phonenumberlength][startdigit];
}
