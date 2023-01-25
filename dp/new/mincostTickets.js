const DAYS = [1, 7, 31];

/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const lastDate = days[days.length - 1];
  const TABLE = new Array(lastDate + 1).fill(Infinity);
  TABLE[0] = 0;
  const daySet = new Set(days);
  for (let day = 1; day <= lastDate; day++) {
    if (!daySet.has(day)) {
      // days not used
      TABLE[day] = TABLE[day - 1];
      continue;
    }
    for (let i = 0; i < costs.length; i++) {
      const prevDay = Math.max(0, day - DAYS[i]);
      TABLE[day] = Math.min(TABLE[day], TABLE[prevDay] + costs[i]);
    }
  }

  return TABLE[lastDate];
};
