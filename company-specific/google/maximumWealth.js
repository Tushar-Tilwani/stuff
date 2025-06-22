/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
  const wealths = accounts.map((acc) => {
    return acc.reduce((acc, v) => acc + v, 0);
  });
  return Math.max(...wealths);
};
