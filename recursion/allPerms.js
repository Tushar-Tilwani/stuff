function allPerms(arr) {
  const result = [];
  _allPerms(arr, [], result);
  return result;
}

function _allPerms(decision, choosed, result) {
  const l = decision.length;
  if (l === 0) {
    result.push(choosed);
  }
  for (let i = 0; i < decision.length; i++) {
    const decisionLeft = [...decision.slice(0, i), ...decision.slice(i + 1, l)];
    const newChoosed = [...choosed, decision[i]];
    // console.log(decisionLeft, newChoosed);

    _allPerms(decisionLeft, newChoosed, result);
  }
}

console.log(allPerms([1, 2, 3, 4]));
