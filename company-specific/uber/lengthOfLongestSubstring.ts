function lengthOfLongestSubstring(s: string): number {
  const set = new Set<string>();
  let left = -1;
  let right = 0;
  let result = 0;
  while (right < s.length) {
    while (set.has(s[right])) {
      left++;
      set.delete(s[left]);
    }
    set.add(s[right]);
    result = Math.max(result, right - left);
    right++;
  }
  return result;
}
