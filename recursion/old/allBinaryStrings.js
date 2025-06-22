function allBinaryStringsOfLengthN(n) {
  const result = [];
  const digits = Array.from(new Array(10)).map((s, i) => i);
  _allBinaryStringsOfLengthN("", n, digits, result);
  return result;
}

function _allBinaryStringsOfLengthN(
  alreadyChoosed,
  level,
  makeDecisionFrom,
  result
) {
  if (level === 0) {
    return result.push(alreadyChoosed);
  }

  for (let i = 0; i < makeDecisionFrom.length; i++) {
    _allBinaryStringsOfLengthN(
      `${alreadyChoosed}${makeDecisionFrom[i]}`,
      level - 1,
      makeDecisionFrom,
      result
    );
  }
}

console.log(allBinaryStringsOfLengthN(2));
