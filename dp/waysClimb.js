// Complete the countWaysToClimb function below.
function countWaysToClimb(steps, n) {
  const table = [1];

  for (let i = 1; i <= n; i++) {
    table[i] = 0;
    for (let step of steps) {
      const subProblemIndex = i - step;
      if (subProblemIndex < 0) {
        continue;
      }
      table[i] += table[subProblemIndex];
    }
  }

  return table[n] || 0;
}

// n = 7
// steps = [2, 3]

console.log(countWaysToClimb([2, 3], 1));
