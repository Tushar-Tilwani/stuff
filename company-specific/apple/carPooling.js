/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  const tripsIntervals = trips
    .reduce((acc, [tripCapacity, start, end]) => {
      acc.push([start, "s", tripCapacity]);
      acc.push([end, "e", tripCapacity]);
      return acc;
    }, [])
    .sort((trip1, trip2) => {
      const diff = trip1[0] - trip2[0];
      if (diff === 0) {
        return trip1[1].localeCompare(trip2[1]);
      }
      return diff;
    });

  let currentCapacity = 0;
  for (const [time, type, tripCapacity] of tripsIntervals) {
    // console.log([time, type, tripCapacity], currentCapacity);
    if (currentCapacity > capacity) {
      return false;
    }
    if (type === "s") {
      currentCapacity += tripCapacity;
    } else {
      currentCapacity -= tripCapacity;
    }
  }
  return true;
};
