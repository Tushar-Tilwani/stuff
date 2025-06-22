/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
var alertNames = function (keyName, keyTime) {
  const employeeTimesMap = new Map();
  for (let i = 0; i < keyName.length; i++) {
    const employee = keyName[i];
    const time = getTime(keyTime[i]);
    if (!employeeTimesMap.has(employee)) {
      employeeTimesMap.set(employee, []);
    }
    employeeTimesMap.get(employee).push(time);
  }
  const result = [];
  for (const key of employeeTimesMap.keys()) {
    const employeeTimes = employeeTimesMap.get(key);
    employeeTimes.sort((a, b) => a - b);
    if (showAlert(employeeTimes)) {
      result.push(key);
    }
  }
  return result.sort((a, b) => a.localeCompare(b));
};

function getTime(timeStr) {
  const timeArr = timeStr.split(":").map((time) => parseInt(time));
  return timeArr[0] * 60 + timeArr[1];
}

function showAlert(times) {
  if (times.lenght < 3) {
    return false;
  }
  for (let i = 0; i < times.length - 2; i++) {
    if (times[i + 2] - times[i] <= 60) {
      return true;
    }
  }
  return false;
}
