function getAllSetsIterative(arr) {
  const result = [[]];
  for (const currentEle of arr) {
    /**
     * Set is currentEle added to the current result;
     * [[],[a]] new is b
     * [[], [a], [b], [a,b]]
     * */
    const initialLength = result.length;
    for (let i = 0; i < initialLength; i++) {
      result.push([...result[i], currentEle]);
    }
  }
  const set = new Set(result.map((res) => res.join()));
  const dupRemovedVals = Array.from(set.values());
  const finalResult = dupRemovedVals.map((res) =>
    res !== ""
      ? res
          .split(",")
          .map((s) => parseInt(s))
          .sort((a, b) => a - b)
      : []
  );

  return finalResult;
}
const ans = getAllSetsIterative([1, 2, 2]);
console.log(ans.length, ans);
