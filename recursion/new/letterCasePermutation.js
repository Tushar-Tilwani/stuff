/**
 * @param {string} s
 * @return {string[]}
 */
function letterCasePermutation(s) {
  const result = [];
  helper(s, [], result);
  return result;
}

function helper(s, slate, result) {
  if (slate.length === s.length) {
    result.push(slate.join(""));
    return;
  }
  const char = s.charAt(slate.length);

  if (isLetter(char)) {
    slate.push(char.toLocaleLowerCase());
    helper(s, slate, result);
    slate.pop();

    slate.push(char.toLocaleUpperCase());
    helper(s, slate, result);
    slate.pop();
  } else {
    slate.push(char);
    helper(s, slate, result);
    slate.pop();
  }
}

function isLetter(str) {
  return str.match(/[a-z]/i);
}

console.log(letterCasePermutation("a1b2"));
