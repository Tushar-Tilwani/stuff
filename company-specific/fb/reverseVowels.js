/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const vowelSet = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  const result = s.split("");
  let start = 0;
  let end = s.length - 1;
  while (start < end) {
    if (vowelSet.has(s[start]) && vowelSet.has(s[end])) {
      swap(result, start, end);
      start++;
      end--;
      continue;
    }
    if (!vowelSet.has(s[start])) {
      start++;
    }
    if (!vowelSet.has(s[end])) {
      end--;
    }
  }
  return result.join("");
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
