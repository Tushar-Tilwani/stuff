/* Apply Lazy Manager Strategy 
Get all Binary Strings Of length N-1 
and append 0, 1 at every string return from the recurive result.
Base case if n==1 then just return the number system.
https://www.youtube.com/watch?v=nsVpJfty-ck
*/
function allBinaryStringsOfLengthN(n) {
  const numberSystem = ["0", "1"];
  if (n < 1) {
    return [];
  } else if (n === 1) {
    return numberSystem;
  }
  const allBinaryStringsOfLengthN_1 = allBinaryStringsOfLengthN(n - 1);
  return allBinaryStringsOfLengthN_1.reduce((acc, str) => {
    numberSystem.forEach(d => {
      acc.push(`${str}${d}`);
    });
    return acc;
  }, []);
}

console.log(allBinaryStringsOfLengthN(3));





