// Same as permutation

function allBinaryStringsOfLengthN(n) {
  const result = [];
  const digits = Array.from(new Array(3)).map((s, i) => i);
  _allBinaryStringsOfLengthN("", n, digits, result);
  return result;
}

function _allBinaryStringsOfLengthN(
  alreadyChoosed,
  level,
  makeDecisionFrom,
  result
) {
  const l = makeDecisionFrom.length;
  if (l === 0) {
    return result.push(alreadyChoosed);
  }
 

  for (let i = 0; i < l; i++) {
    _allBinaryStringsOfLengthN(
      `${alreadyChoosed}${makeDecisionFrom[i]}`,
      level - 1,
      [...makeDecisionFrom.slice(0, i), ...makeDecisionFrom.slice(i + 1, l)],
      result
    );
  }
}

console.log(allBinaryStringsOfLengthN(2));
