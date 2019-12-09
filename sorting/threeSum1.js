/*
 * Complete the function below.
 */
function findZeroSum(arr) {
  // Write your code here.
  const indexMap = arr.reduce((acc, value, index) => {
    if (!acc.has(value)) {
      acc.set(value, index);
    }

    // else {
    //   acc.set(value, index);
    // }
    return acc;
  }, new Map());

  let result = new Set();
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    let outerValue = arr[i];
    let c = -outerValue;
    for (let j = 0; j < len; j++) {
      if (i === j) {
        continue;
      }
      let innerValue = arr[j];
      const complememnt = c - innerValue;
      if (!indexMap.has(complememnt)) {
        continue;
      }
      const k = indexMap.get(complememnt);
      if (k !== j && k !== i) {
        result.add([innerValue, complememnt, outerValue].sort().join(","));
      }
    }
  }
  const intParse = val => parseInt(val);
  return Array.from(result.values()).map(uniqueArr =>
    uniqueArr.split(",").map(intParse)
  );
}


const g = [5, -2, 2, 0, -1, 1];
const test2 = [1, 1, 1, 1, 0, 0, 3, -3, 3, 3, 2, 2, -2, 2, -5];

console.log(findZeroSum(g));
