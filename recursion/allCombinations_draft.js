function allCombs(n) {
  const result = [];
  const digits = Array.from(new Array(5)).map((s, i) => i);
  _allCombs("", n, digits, result);
  return result;
}

function _allCombs(alreadyChoosed, level, makeDecisionFrom, result) {
  const l = makeDecisionFrom.length;
  if (level === 0) {
    return result.push(alreadyChoosed);
  }

  if (level === l) {
    return result.push(`${alreadyChoosed}${makeDecisionFrom.join("")}`);
  }

  const makeDecisionFromCopy = [...makeDecisionFrom];

  let ele = makeDecisionFromCopy.pop();
  // Choosed
  _allCombs(`${alreadyChoosed}${ele}`, level - 1, makeDecisionFromCopy, result);

  // Not Choosed
  _allCombs(`${alreadyChoosed}`, level, makeDecisionFromCopy, result);
}

console.log(allCombs(3));
