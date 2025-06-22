/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
function alertNames(keyName, keyTime) {
  const map = new Map();
  for (let i = 0; i < keyName.length; i++) {
    const name = keyName[i];
    const time = getTime(keyTime[i]);
    if (!map.has(name)) {
      map.set(name, [time]);
    } else {
      map.get(name).push(time);
    }
  }

  const result = [];
  // Sort times
  for (const [name, times] of map.entries()) {
    times.sort((a, b) => a - b);
    if (isWithinHour(times)) {
      result.push(name);
    }
  }

  return result.sort((a, b) => a.localeCompare(b));
}

function getTime(timeStr) {
  const keyTimeArr = timeStr.split(":");
  return 60 * parseInt(keyTimeArr[0]) + parseInt(keyTimeArr[1]);
}

function isWithinHour(timeArray) {
  for (let i = 0; i + 2 < timeArray.length; i++) {
    if (timeArray[i + 2] - timeArray[i] <= 60) {
      return true;
    }
  }
  return false;
}

let keyName = ["daniel", "daniel", "daniel", "luis", "luis", "luis", "luis"],
  keyTime = ["10:00", "10:40", "11:00", "09:00", "11:00", "13:00", "15:00"];

(keyName = ["alice", "alice", "alice", "bob", "bob", "bob", "bob"]),
  (keyTime = ["12:01", "12:00", "18:00", "21:00", "21:20", "21:30", "23:00"]);

console.log(alertNames(keyName, keyTime));
