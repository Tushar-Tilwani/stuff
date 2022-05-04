/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function (time) {
  const times = time.map((t) => t % 60);

  const map = new Map();
  let count = 0;
  for (const t of times) {
    const rT = (60 - t) % 60;
    if (map.has(rT)) {
      count += map.get(rT);
    }
    map.set(t, (map.get(t) ?? 0) + 1);
  }

  return count;
};

console.log(numPairsDivisibleBy60([30, 20, 150, 100, 40]));
console.log(numPairsDivisibleBy60([60, 60, 60]));
