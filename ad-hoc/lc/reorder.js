/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function(logs) {
  const base = "a".charCodeAt(0);

  const charCompare = (str1, str2) => {
    const charCode1 = str1.charCodeAt(0) - base;
    const charCode2 = str2.charCodeAt(0) - base;
    const isNotChar1 = charCode1 < 0 || charCode1 > 25;
    const isNotChar2 = charCode2 < 0 || charCode2 > 25;

    if (isNotChar1 && isNotChar2) {
      return 0;
    }

    if (isNotChar1 && !isNotChar2) {
      return 1;
    }

    if (!isNotChar1 && isNotChar2) {
      return -1;
    }

    return null;
  };

  const logSorter = (
    { log: log1, index: index1 },
    { log: log2, index: index2 }
  ) => {
    const areAllChar = charCompare(log1[1], log2[1]);

    if (areAllChar !== null) {
      return areAllChar;
    }

    const minLen = Math.min(log1.length, log2.length);

    for (let i = 1; i < minLen; i++) {
      const val = log1[i].localeCompare(log2[i]);
      if (val !== 0) {
        return val;
      }
    }

    if (log1.length !== log2.length) {
      return log1.length - log2.length;
    }

    return index1 - index2;
  };

  const logsArr = logs
    .map((log, index) => ({ log: log.split(" "), index }))
    .sort(logSorter)
    .map(({ log }) => log.join(" "));
  return logsArr;
};
