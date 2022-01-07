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
  return result;
}
const ans = getAllSetsIterative(["a", "a", "c"]);
console.log(ans.length, ans);
