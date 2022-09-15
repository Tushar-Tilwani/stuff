/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
function buddyStrings(s, goal) {
  if (s.length !== goal.length) {
    return false;
  }
  const len = s.length;
  let diff = [];
  let hasMultiple = false;
  const set = new Set();
  for (let i = 0; i < len; i++) {
    hasMultiple = hasMultiple || set.has(s[i]);
    set.add(s[i]);
    if (s[i] !== goal[i]) {
      diff.push([s[i], goal[i]]);
    }
  }

  if (diff.length === 2) {
    const [[v1, v2], [b1, b2]] = diff;
    return v1 === b2 && v2 === b1;
  }

  if (diff.length === 0) {
    return hasMultiple;
  }

  return false;
}
