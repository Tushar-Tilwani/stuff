function characterReplacement(s: string, k: number): number {
  const freqMap = new Map<string, number>();
  let maxCharCount = 0;
  let left = 0;
  let result = 0;
  for (let right = 0; right < s.length; right++) {
    const count = right - left + 1;
    const rChar = s[right];
    const lChar = s[left];

    if (count - maxCharCount > k) {
      // overshot
      freqMap.set(lChar, freqMap.get(lChar)! - 1);
      left++;
    }

    freqMap.set(rChar, (freqMap.get(rChar) ?? 0) + 1);
    maxCharCount = Math.max(maxCharCount, freqMap.get(rChar)!);
    result = Math.max(result, right - left + 1);
  }

  return result;
}
