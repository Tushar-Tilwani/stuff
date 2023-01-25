function subarraySort(array) {
  // Write your code here.
  const STACK = [[-Infinity, -1]];
  let start = -1;
  let end = -1;
  for (let currentIndex = 0; currentIndex < array.length; currentIndex++) {
    const currentVal = array[currentIndex];
    let [topVal, index] = STACK[STACK.length - 1];
    while (currentVal < topVal) {
      start = index;
      end = currentIndex;
      [topVal, index] = STACK.pop();
    }
    
    STACK.push([currentVal, currentIndex]);
  }

  return [start, end];
}

console.log(subarraySort([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]));
// Do not edit the line below.
exports.subarraySort = subarraySort;
