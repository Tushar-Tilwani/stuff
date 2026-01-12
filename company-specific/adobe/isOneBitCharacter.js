/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function (bits) {
  if (bits[bits.length - 1] === 1) {
    return false;
  }
  return check(bits, 0);
};

function check(bits, index) {
  if (index >= bits.length) {
    return false;
  }
  // 0, 11, 10
  if (index === bits.length - 1 && bits[index] === 0) {
    //ends with zero
    return true;
  }
  let value = false;
  if (bits[index] === 0) {
    value = value || check(bits, index + 1);
  }

  if (bits[index] === 1 && bits[index] === 0) {
    value = value || check(bits, index + 2);
  }

  if (bits[index] === 1 && bits[index] === 1) {
    value = value || check(bits, index + 2);
  }

  return value;
}
