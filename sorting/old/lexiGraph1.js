/*
 * Complete the solve function below.
 */
function solve(arr) {
  /*
   * Write your code here.
   */
  const contentMap = arr.reduce((accMap, keyValuePair) => {
    const [key, value] = keyValuePair.split(" ");

    if (!accMap.has(key)) {
      accMap.set(key, { count: 1, highestValue: value });
    } else {
      const currentStatus = accMap.get(key);
      currentStatus.count += 1;
      if (value.localeCompare(currentStatus.highestValue) === 1) {
        currentStatus.highestValue = value;
      }
    }

    return accMap;
  }, new Map());

  // "mark:2,zuckerberg",
  return Array.from(contentMap.entries()).map(([key, status]) => {
    return `${key}:${status.count},${status.highestValue}`;
  });
}

const arr = ["key1 abcd", "key2 zzz", "key1 hello", "key3 world", "key1 hello"];

const arr1 = ["mark zuckerberg", "tim cook", "mark twain"];

console.log(solve(arr), solve(arr1));
