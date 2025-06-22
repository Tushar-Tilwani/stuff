const normalize = (str) => {
  const [id, ...strArr] = str.split(" ");
  if (strArr.join("").match(/^\d/)) {
    return ["zzzzzzzzzzz", id];
  }
  return [[...strArr].join(" "), id];
};

/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function (logs) {
  // const map =
  return logs.sort((l1, l2) => {
    const [s1, id1] = normalize(l1);
    const [s2, id2] = normalize(l2);

    if (s1 === s2) {
      return id1.localeCompare(id2);
    }
    return s1.localeCompare(s2);
  });
};
