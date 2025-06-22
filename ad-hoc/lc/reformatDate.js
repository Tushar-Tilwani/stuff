const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * @param {string} date
 * @return {string}
 */
var reformatDate = function (date) {
  const [day, month, year] = date.split(" ");
  const monthNumber = String(MONTHS.indexOf(month)).padStart(2, "0");
  const dayNumber = day.slice(0, 2);
  return `${year}-${monthNumber}-${dayNumber}`;
};
