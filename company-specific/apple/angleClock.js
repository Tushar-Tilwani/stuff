/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
var angleClock = function (hour, minutes) {
  let hourAngle = hour * 30 + (minutes * 30) / 60;
  hourAngle = hourAngle > 360 ? hourAngle - 360 : hourAngle;
  const minuteAngle = minutes * 6;
  return Math.min(
    Math.abs(hourAngle - minuteAngle),
    360 - Math.abs(minuteAngle - hourAngle)
  );
};
