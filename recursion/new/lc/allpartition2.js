/**
 * @param {string} s
 * @return {string[][]}
 */
function partition(s) {
  const result = [];
  helper(s, 0, [], result);
  return result;
}


function helper(s, start, slate, result) {
  if (start === s.length) {
    result.push(slate.slice(0));
    return;
  }

  for (let i = start; i < s.length; i++) {
    const prefix = getSubStr(s, start, i);

    /**
     * Back Tracking Case
     * do not go further if
     * prefix is not plaindrome
     */

    if (!isPalindrome(prefix)) {
      continue;
    }

    slate.push(prefix);
    helper(s, i + 1, slate, result);
    slate.pop();
  }
}

function getSubStr(s, start, end) {
  // slice take end+1;
  return s.slice(start, end + 1);
}

function isPalindrome(str) {
  const len = str.length - 1;
  const mid = Math.floor(len / 2);
  for (let i = 0; i <= mid; i++) {
    if (str[i] !== str[len - i]) {
      return false;
    }
  }

  return true;
}

console.log(partition("abba"));
