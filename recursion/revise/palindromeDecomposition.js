function generate_palindromic_decompositions(s) {
  const result = [];
  all_subStringsHelper(s.split(""), result, 0);
  return result.join("|");
}

function all_subStringsHelper(strArr, path, result) {
  const len = strArr.length;
  if (len === 0) {
    return;
  }

  if (len === 1) {
    path.push(strArr.join(""));
    return;
  }

  for (let i = 1; i < strArr.length; i++) {
    if (isPalindrome(strArr.slice(0, i))) {
      path.push(strArr.join(""));
    }
    all_subStringsHelper(strArr.slice(i));
  }
}

function isPalindrome(strArr) {
  const len = strArr.length;
  const mid = Math.floor(len / 2);
  for (let i = 0; i < mid; i++) {
    if (strArr[len - 1 - i] !== strArr[i]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome(["a"]));
