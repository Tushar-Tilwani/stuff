/**
 * @param {string} S
 * @return {string}
 */
var removeOuterParentheses = function(S) {
  const STACK = [];
  const result = [];
  const LEFT_PARAN = "(";
  const RIGHT_PARAN = ")";
  let level = 0;
  for (let i = 0; i < S.length; i++) {
    const paran = S[i];
    if (paran === LEFT_PARAN) {
      STACK.push(LEFT_PARAN);
      level++;
    } else {
      STACK.pop();
      if (level > 0) {
        result.push("()");
      }
      level--;
    }
  }
};
