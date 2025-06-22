function firstDuplicateValue(array) {
  /**
   * Get any larger value than n. In the following example length is 7 so we pick 8
   * n => 8
   * 0 => [2, 1, 5, 2, 3, 3, 4]
   * 1 => [2, *9*, 5, 2, 3, 3, 4]
   * 2 => [*10*, 9, 5, 2, 3, 3, 4]
   * 3 => [10, 9, 5, 2, *11*, 3, 4]
   * 4 => [10, 9, 5, 2, *11*, 3, 4] 
   * Found! as value at 2 is greater than length of the array as that's not possbile given the context of array
   */
  const divisor = array.length + 1;
  let i = 0;
  while (i < array.length) {
    const num = array[i] % divisor;
    if (array[num - 1] > divisor) {
      return num;
    }
    array[num - 1] = array[num - 1] + divisor;
    i++;
  }
  return -1;
}

// Do not edit the line below.
exports.firstDuplicateValue = firstDuplicateValue;
