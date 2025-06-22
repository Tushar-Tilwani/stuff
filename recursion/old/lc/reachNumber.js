/**
 * @param {number} target
 * @return {number}
 */
var reachNumber = function (target) {
  return bfs(target);
};

function bfs(target) {
  const QUEUE = [{ currentNumber: 0, distance: 1, steps: 0 }];
  while (true) {
    const { currentNumber, distance, steps } = QUEUE.shift();
    if (currentNumber === target) {
      return steps;
    }
    QUEUE.push({
      currentNumber: currentNumber + distance,
      distance: distance + 1,
      steps: steps + 1,
    });
    QUEUE.push({
      currentNumber: currentNumber - distance,
      distance: distance + 1,
      steps: steps + 1,
    });
  }
}
