/**
 * @param {number[][]} transactions
 * @return {number}
 */
const minTransfers = function (transactions) {
  const transactionMap = transactions.reduce(
    (map, [sender, receiver, amount]) => {
      const senderAmount = (map.get(sender) ?? 0) - amount;
      const receiverAmount = (map.get(receiver) ?? 0) + amount;
      map.set(sender, senderAmount);
      map.set(receiver, receiverAmount);
      return map;
    },
    new Map()
  );

  const ids = Array.from(transactionMap.keys());

  for (const id of ids) {
    if (transactionMap.get(id) === 0) {
      transactionMap.delete(id);
    }
  }

  const result = [Number.MAX_VALUE];
  // console.log(transactionMap, positiveArr, negativeArr);
  // helper(transactionMap, positiveArr, negativeArr, 0, 0, 0, result);

  return result[0];
};

function dfs(transactionMap, depth, result) {
  if (transactionMap.size() === 0) {
    result[0] = Math.min(result[0], depth);
    return;
  }

  const ids = Array.from(transactionMap.keys());
  for (const rootId of ids) {
    for (const testId of ids) {
      const rootAmount = transactionMap.get(rootId);
      const testAmount = transactionMap.get(testId);
      if (rootAmount * testAmount > 0) {
        continue;
      }
    }
  }
}

console.log(
  minTransfers([
    [1, 8, 1],
    [1, 13, 21],
    [2, 8, 10],
    [3, 9, 20],
    [4, 10, 61],
    [5, 11, 61],
    [6, 12, 59],
    [7, 13, 60],
  ])
);

