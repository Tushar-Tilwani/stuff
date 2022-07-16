const countReduce = (acc, char) => {
  acc.set(char, (acc.get(char) ?? 0) + 1);
  return acc;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var minSteps = function (s, t) {
  const s1 = s.split("");
  const s2 = t.split("");
  const s1Map = s1.reduce(countReduce, new Map());
  const s2Map = s2.reduce(countReduce, new Map());
  const uniqueChars = new Set([...s1, ...s2]);

  let result = 0;
  for (const char of uniqueChars.keys()) {
    result = Math.abs((s1Map.get(char) ?? 0) - (s2Map.get(char) ?? 0));
  }
  return result / 2;
};
