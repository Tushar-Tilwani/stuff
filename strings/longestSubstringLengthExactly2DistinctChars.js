// Complete the getLongestSubstringLengthExactly2DistinctChars function below.
function getLongestSubstringLengthExactly2DistinctChars(s) {
  const map = new Map();
  const k = 2;
  const len = s.length;
  let left = 0,
    right = 0;
  let result = [0, 0];

  while (right <= len) {
    if (map.size <= k) {
      const [start, end] = result;
      if (end - start <= right - left) {
        result = [left, right];
      }
      map.set(s[right], map.get(s[right]) + 1 || 1);
      right++;
    } else {
      let value = map.get(s[left]) - 1;
      if (value === 0) {
        map.delete(s[left]);
      } else {
        map.set(s[left], value);
      }
      left++;
    }
  }
  const [start, end] = result;
  return end - start;
}

console.log(getLongestSubstringLengthExactly2DistinctChars("a"));
