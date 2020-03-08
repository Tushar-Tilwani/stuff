function generate_palindromic_decompositions(s) {
  const result = [];
  all_subStringsHelper(s.split(""), [], result);
  return result;
}

function all_subStringsHelper(strArr, path, result) {
  const len = strArr.length;

  if (len <= 1) {
    path.push(strArr.join(""));
    result.push(path.filter(v => !!v).join("|"));
    path.pop();
    return;
  }

  for (let i = 1; i <= len; i++) {
    const prefix = strArr.slice(0, i);
    const leftArr = strArr.slice(i);
    // console.log(prefix, leftArr);
    if (isPalindrome(prefix)) {
      path.push(prefix.join(""));
      all_subStringsHelper(leftArr, path, result);
      path.pop();
    }
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

console.log(generate_palindromic_decompositions("aabbaa"));
