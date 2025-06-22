/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  const sortedCitations = citations.sort((a, b) => a - b);
  const len = citations.length;
  for (let i = len; i > 0; i--) {
    if (sortedCitations[len - i] >= i) {
      return i;
    }
  }
  return 0;
};
