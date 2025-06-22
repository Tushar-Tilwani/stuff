/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
var daysBetweenDates = function (date1, date2) {
  return Math.floor(
    Math.abs(Date.parse(date1) - Date.parse(date2)) / (60 * 60 * 1000)
  );
};

function parseDate(date) {
  const [year, month, day] = date.split("-").map((str) => parseInt(str));
  const yearDiff = year - 1971 - 1;
  const yearDays = yearDiff * 365 + Math.floor(yearDiff / 4);

  const set31 = new Set([1, 3, 5, 7, 8, 10]);
  let monthDays = 0;
  for (let i = 1; i < month; i++) {
    if (i === 2) {
      monthDays += year % 4 === 0 ? 28 : 29;
      continue;
    }
    monthDays += set31.has(i) ? 31 : 30;
  }

  return yearDays + monthDays + day;
}
