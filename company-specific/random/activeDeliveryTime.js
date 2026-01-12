// Tushar

function activeDeliveryTime(events) {
  const sortedEvents = events.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[2] - a[2];
    }
    return a[1] - b[1];
  });

  let basketCount = 0;
  let start = -1;
  let result = 0;
  for (let i = 0; i < sortedEvents.length; i++) {
    const [, time, type] = sortedEvents[i];
    if (type === 0 && basketCount === 0) {
      start = time;
    }
    basketCount += type === 0 ? 1 : -1;
    if (basketCount === 0) {
      result += time - start;
    }
  }
  return result;
}

const events = [
  [1, 1591846068, 0],
  [2, 1591846070, 0],
  [1, 1591846071, 1],
  [2, 1591846080, 1],

  [3, 1591846090, 0],
  [3, 1591846102, 1],
];

console.log(activeDeliveryTime(events));
