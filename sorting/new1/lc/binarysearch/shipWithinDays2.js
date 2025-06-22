/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
const shipWithinDays = function (weights, days) {
  // O(n)
  let start = 1; // Min capacity will be equal to max weight in the set
  let end = Number.MAX_SAFE_INTEGER; // Sum of all weight

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const calculateDays = getDays(weights, mid);

    if (calculateDays <= days) {
      // Capacity can be decreased as decreased capacity leads to more days
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
};

function getDays(weights, capacity) {
  let days = 0;
  let floatingSum = 0;
  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > capacity) {
      return Infinity;
    }
    floatingSum += weights[i];
    if (floatingSum > capacity) {
      days += 1;
      floatingSum = weights[i];
    }
  }

  return days + 1;
}
