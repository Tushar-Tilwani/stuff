function testAlphaNumberPalindrome(str) {
  let start = 0;
  let end = str.length - 1;
  while (start < end) {
    if (!isCharacterOrDigit(str.charAt(start))) {
      start++;
      continue;
    }
    if (!isCharacterOrDigit(str.charAt(end))) {
      end--;
      continue;
    }
    if (str.charAt(start).toUpperCase() !== str.charAt(end).toUpperCase()) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

function isCharacterOrDigit(char) {
  const regex = /^[0-9a-zA-Z]+$/;
  return !!char && regex.test(char);
}

const tst = "A man, a plan, a canal: Panama";

console.log(testAlphaNumberPalindrome(""));
