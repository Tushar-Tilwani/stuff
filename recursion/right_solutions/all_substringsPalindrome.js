function all_subStrings(s) {
  const result = [];
  all_subStringsHelper(s, 0, result);
  return result.join('|');
}

function all_subStringsHelper(s, start, result) {
  const l = s.length;
  if (!(start < l)) {
    return;
  }

  let str = "";
  for (let i = start; i < l; i++) {
    str += s.charAt(i);
    if (isPalindrome(str)) {
      result.push(str);
    }
  }

  all_subStringsHelper(s, start + 1, result);
}

function isPalindrome(str) {
  const len = str.length;
  const mid = Math.floor(len / 2);
  for (let i = 0; i < mid; i++) {
    if (str.charAt(len - 1 - i) !== str.charAt(i)) {
      return false;
    }
  }
  return true;
}

console.log(all_subStrings("abacdef"));
