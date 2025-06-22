/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
const minEatingSpeed = function (piles, h) {
  let start = 1;
  let end = Math.pow(10, 9);

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = getHours(piles, mid);

    if (midVal <= h) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return start;
};

function getHours(piles, speed) {
  let totalHours = 0;
  for (let i = 0; i < piles.length; i++) {
    totalHours += Math.ceil(piles[i] / speed);
  }
  return totalHours;
}
