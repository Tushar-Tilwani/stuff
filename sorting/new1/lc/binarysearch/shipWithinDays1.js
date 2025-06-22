/**
 * @param {number[]} weights
 * @param {number} targetDays
 * @return {number}
 */
const shipWithinDays = function (weights, targetDays) {
  // O(n)
  let startCapacity = Math.max(...weights); // Min capacity will be equal to max weight in the set
  let endCapacity = weights.reduce((acc, weight) => acc + weight, 0); // Sum of all weight

  while (startCapacity <= endCapacity) {
    const midCapacity = Math.floor((endCapacity - startCapacity) / 2) + startCapacity;
    const daysForMid = getDays(weights, midCapacity);

    if (daysForMid <= targetDays) {
      // Capacity can be decreased as decreased capacity leads to more days
      endCapacity = midCapacity - 1;
    } else {
      startCapacity = midCapacity + 1;
    }
  }

  return startCapacity;
};

function getDays(weights, capacity) {
  let days = 0;
  let floatingSum = 0;
  for (let i = 0; i < weights.length; i++) {
    floatingSum += weights[i];
    if (floatingSum > capacity) {
      days += 1;
      floatingSum = weights[i];
    }
  }

  return days + 1;
}

// console.log("getDays", shipWithinDays([3, 2, 2, 4, 1, 4], 3));

// console.log("getDays", getDays([3, 2, 2, 4, 1, 4], 6));
// console.log("getDays", getDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 55));
// console.log("getDays", getDays([1, 2, 3, 1, 1], 4), Number.MAX_SAFE_INTEGER, Infinity);
