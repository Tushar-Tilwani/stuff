/**
 * @param {string} word
 * @param {string} abbr
 * @return {boolean}
 */
var validWordAbbreviation = function (word, abbr) {
  let wI = 0;
  let aI = 0;
  while (aI < abbr.length) {
    if (!is_numeric(abbr[aI])) {
      //   console.log(abbr[aI], aI, word[wI], wI);
      if (abbr[aI] !== word[wI]) {
        return false;
      }
      aI++;
      wI++;
      continue;
    }

    const nums = [];
    while (is_numeric(abbr[aI])) {
      nums.push(abbr[aI++]);
    }
    const strNum = nums.join("");
    if (strNum.startsWith(0)) {
      return false;
    }
    wI += parseInt(strNum);
  }

  return true;
};

function is_numeric(str) {
  return /^\d+$/.test(str);
}

console.log(validWordAbbreviation("internationalization", "i12iz4n"));
