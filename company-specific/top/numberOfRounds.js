const TIME_WINDOW = 15;
const MINUTES_IN_DAY = 60;
const NUM_OF_INTERVALS = (24 * MINUTES_IN_DAY) / TIME_WINDOW;
/**
 * @param {string} loginTime
 * @param {string} logoutTime
 * @return {number}
 */
var numberOfRounds = function (loginTime, logoutTime) {
  const loginTimeArr = getTime(loginTime);
  const logoutTimeArr = getTime(logoutTime);

  const loginTimeStamp = loginTimeArr[0] * MINUTES_IN_DAY + loginTimeArr[1];
  let logoutTimeStamp = logoutTimeArr[0] * MINUTES_IN_DAY + logoutTimeArr[1];

  if (loginTimeStamp > logoutTimeStamp) {
    logoutTimeStamp += 24 * MINUTES_IN_DAY;
  }
  if (logoutTimeStamp - loginTimeStamp < TIME_WINDOW) {
    return 0;
  }

  return (
    Math.floor(logoutTimeStamp / TIME_WINDOW) -
    Math.ceil(loginTimeStamp / TIME_WINDOW)
  );
};

function getTime(timeStr) {
  return timeStr.split(":").map((val) => parseInt(val));
}
