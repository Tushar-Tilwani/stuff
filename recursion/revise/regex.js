function regexMatch(regex, str) {
  return helper(regex.split(""), str.split(""), 0, 0);
}

function helper(regex, str, rIndex, sIndex) {
  if (rIndex === regex.length) {
    return sIndex === str.length;
  }
  if (sIndex === str.length) {
    return rIndex === regex.length;
  }
  if (regex[rIndex] === str[sIndex]) {
    return helper(regex, str, rIndex + 1, sIndex + 1);
  }
  if (regex[rIndex] === "*") {
    return (
      /* Matched just one charcter */
      helper(regex, str, rIndex + 1, sIndex + 1) ||
      /* Matched no charcter */
      helper(regex, str, rIndex + 1, sIndex) ||
      /* Matched more than one charcter */
      helper(regex, str, rIndex, sIndex + 1)
    );
  }

  if (regex[rIndex] === "?") {
    return helper(regex, str, rIndex + 1, sIndex + 1);
  }

  return false;
}

console.log(regexMatch("*a*b", "adceb"));
