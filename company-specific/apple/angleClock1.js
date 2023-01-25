const TOTAL_HOURS = 360 / (12 * 60);
const TOTAL_MINUTES = 360 / 60;

/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
var angleClock = function (hour, minutes) {
  const hourAngle = (hour * 60 + minutes) * TOTAL_HOURS;
  const minutesAngle = minutes * TOTAL_MINUTES;
  return Math.abs(hourAngle - minutesAngle);
};
