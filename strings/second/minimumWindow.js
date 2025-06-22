/*
 * Complete the 'minimum_window' function below.
 *
 * The function accepts STRING s and STRING t as parameter.
 */

function minimum_window(s, t) {
  // Write your code here
  const map = t.split("").reduce((acc, v) => {
    acc[v] = acc[v] + 1 || 1;
    return acc;
  }, {});

  let missingValues = Object.values(map).reduce((sum, v) => {
    sum += v;
    return sum;
  });

  let result = [-Infinity, Infinity];
  let left = 0;
  let right = 0;

  while (right <= s.length) {
    if (missingValues !== 0) {
      const rightChar = s[right];
      if (Number.isFinite(map[rightChar])) {
        if (map[rightChar] > 0) {
          missingValues -= 1;
        }
        map[rightChar] -= 1;
      }
      right++;
    } else {
      const [start, end] = result;
      if (end - start > right - left) {
        result = [left, right];
      }
      const leftChar = s[left];

      if (Number.isFinite(map[leftChar])) {
        if (map[leftChar] >= 0) {
          missingValues += 1;
        }
        map[leftChar] += 1;
      }
      left++;
    }
  }
  const [start, end] = result;

  if (Number.isFinite(start)) {
    return s.slice(start, end);
  }
  return "";
}

console.log(minimum_window("azisdflc", "zsd"));
