// Decrease and conquer. We need O(n) space
// 0,1 .. 2, 3... 4, 5.. => That's the perfect setting
// And even id (n_ person will always couple as odd id (n+1) person
// Use that to swap people this
// At every iteration reduce one cycle
// Somewhat similiar to CYCLE SORT
// Check:  https://uplevel.interviewkickstart.com/resource/rc-video-367728-1166707-247-1559
// 6:28


/**
 * @param {number[]} row
 * @return {number}
 */
 const minSwapsCouples = function (row) {
  const idMap = row.reduce((acc, value, index) => {
    acc.set(value, index);
    return acc;
  }, new Map());

  let result = 0;

  for (let fpIndex = 0; fpIndex < row.length; fpIndex = fpIndex + 2) {
    const fpId = row[fpIndex];
    const isFirstPersonEven = fpId % 2 == 0;
    const spId = isFirstPersonEven ? fpId + 1 : fpId - 1;
    const spIndex = idMap.get(spId);

    if (spIndex === fpIndex + 1) {
      // Already seating as a couple
      continue;
    }

    result += 1;

    // Swap index in map and array
    idMap.set(spId, fpIndex + 1);
    idMap.set(row[fpIndex + 1], spIndex);
    swap(row, fpIndex + 1, spIndex);
  }

  return result;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
