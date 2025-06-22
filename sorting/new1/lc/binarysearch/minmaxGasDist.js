const FACTOR = 10 ** -6;
/**
 * @param {number[]} stations
 * @param {number} k
 * @return {number}
 */
const minmaxGasDist = function (stations, k) {
  const diffs = [];
  for (let i = 0; i < stations.length - 1; i++) {
    diffs.push(stations[i + 1] - stations[i]);
  }
  diffs.sort((a, b) => b - a);

  let start = 0;
  let end = diffs[0];

  while (start <= end) {
    const mid = (end - start) / 2 + start;
    const midVal = getKByDist(diffs, mid);

    if (midVal <= k) {
      end = mid - FACTOR;
    } else {
      start = mid + FACTOR;
    }
  }

  return start;
};

function getKByDist(sortedDiffs, maxDist) {
  let k = 0;
  let i = 0;
  while (sortedDiffs[i] > maxDist) {
    console.log(sortedDiffs[i] / maxDist);
    k += Math.ceil(sortedDiffs[i] / maxDist) - 1;
    i++;
  }

  return k;
}

// console.log(getKByDist([29, 17, 9, 9, 7, 7, 6, 2, 1], 9.7));

// console.log(getKByDist([19, 14, 12, 10, 8, 7, 3, 1, 1], 9.5));
