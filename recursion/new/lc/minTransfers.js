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

  const positiveArr = [];
  const negativeArr = [];
  let targetSum = 0;
  for (const [id, amount] of transactionMap.entries()) {
    if (amount > 0) {
      positiveArr.push(id);
      targetSum += amount;
    }
    if (amount < 0) {
      negativeArr.push(id);
    }
  }

  positiveArr.sort((a, b) => transactionMap.get(b) - transactionMap.get(a));
  negativeArr.sort((a, b) => transactionMap.get(a) - transactionMap.get(b));
  const result = [Number.MAX_VALUE];
  console.log(transactionMap, positiveArr, negativeArr);
  //   helper(transactionMap, positiveArr, negativeArr, 0, 0, 0, result);

  return result[0];
};

function helper(
  transactionMap,
  positiveArr,
  negativeArr,
  postiveIndex,
  negativeIndex,
  depth,
  result
) {
  if (depth > result[0]) {
    return;
  }

  if (
    postiveIndex === positiveArr.length &&
    negativeIndex === negativeArr.length
  ) {
    result[0] = Math.min(result[0], depth);
    return;
  }

  for (let i = postiveIndex; i < positiveArr.length; i++) {
    for (let j = negativeIndex; j < negativeArr.length; j++) {
      swap(positiveArr, postiveIndex, i);
      swap(negativeArr, negativeIndex, j);
      const positiveId = positiveArr[postiveIndex];
      const negativeId = negativeArr[negativeIndex];
      const positiveAmount = transactionMap.get(positiveId);
      const negativeAmount = transactionMap.get(negativeId);
      const amount = positiveAmount + negativeAmount;
      if (amount === 0) {
        transactionMap.set(positiveId, 0);
        transactionMap.set(negativeId, 0);
        helper(
          transactionMap,
          positiveArr,
          negativeArr,
          postiveIndex + 1,
          negativeIndex + 1,
          depth + 1,
          result
        );
      } else if (amount > 0) {
        transactionMap.set(positiveId, amount);
        transactionMap.set(negativeId, 0);
        helper(
          transactionMap,
          positiveArr,
          negativeArr,
          postiveIndex,
          negativeIndex + 1,
          depth + 1,
          result
        );
      } else {
        transactionMap.set(positiveId, 0);
        transactionMap.set(negativeId, amount);
        helper(
          transactionMap,
          positiveArr,
          negativeArr,
          postiveIndex + 1,
          negativeIndex,
          depth + 1,
          result
        );
      }

      transactionMap.set(positiveId, positiveAmount);
      transactionMap.set(negativeId, negativeAmount);
      swap(positiveArr, postiveIndex, i);
      swap(negativeArr, negativeIndex, j);
    }
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
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
