/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
const nextGreatestLetter = function (letters, target) {
  const len = letters.length;
  let start = 0;
  let end = len - 1;
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    // Letters get converted to ascii integers in JS
    if (target < letters[mid]) {
      end = mid - 1;
      continue;
    }
    // If the values is equal consider that as greater
    // This start will always be one greater than target in case of even duplicates
    start = mid + 1;
  }

  return letters[start % len];
};
