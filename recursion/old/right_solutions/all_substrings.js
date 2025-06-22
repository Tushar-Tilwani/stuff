function all_subStrings(s) {
  const result = [];
  all_subStringsHelper(s, 0, result);
  return result;
}

function all_subStringsHelper(s, start, result) {
  const l = s.length;
  if (!(start < l)) {
    return;
  }

  let str = '';
  for (let i = start; i < l; i++) {
    str += s.charAt(i);
    result.push(str);
  }

  all_subStringsHelper(s, start + 1, result);
}

console.log(all_subStrings("abcd"));
