/**
 * @param {string} s
 * @param {number[]} indices
 * @param {string[]} sources
 * @param {string[]} targets
 * @return {string}
 */
var findReplaceString = function (s, indices, sources, targets) {
  const result = [];
  let startIndex = 0;
  const sortedParams = indices
    .reduce((acc, val, i) => {
      acc.push([indices[i], sources[i], targets[i]]);
      return acc;
    }, [])
    .sort(([index1], [index2]) => index1 - index2);

  for (let i = 0; i < sortedParams.length; i++) {
    const [index, srcStr, targetStr] = sortedParams[i];
    const originalStr = s.substring(index, index + srcStr.length);
    for (let l = startIndex; l < index; l++) {
      result.push(s[l]);
      startIndex++;
    }

    if (originalStr === srcStr) {
      result.push(targetStr);
      startIndex += srcStr.length;
    } else {
      for (let l = 0; l < srcStr.length; l++) {
        result.push(s[startIndex]);
        startIndex++;
      }
    }
  }

  return result.join("");
};
