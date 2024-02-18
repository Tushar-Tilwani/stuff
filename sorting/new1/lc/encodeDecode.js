/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function (strs) {
  return strs.map((str) => `${str.length}#${str}`).join("");
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function (s) {
  const strs = [];
  let i = 0;
  while (i < s.length) {
    const numArr = [];
    while (s[i] >= "0" && s[i] <= "9") {
      numArr.push(s[i++]);
    }
    i++;
    const c = parseInt(numArr.join(""));
    const word = [];
    const end = i + c;
   
    while (i < end && i < s.length) {
      word.push(s[i++]);
    }

    strs.push(word.join(""));
  }
  return strs;
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */

// console.log(decode(encode(["63/Rc", "h", "BmI3FS~J9#vmk", "7uBZ?7*/", "24h+X", "O "])));
