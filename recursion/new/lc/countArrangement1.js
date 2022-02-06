/**
 * @param {number} n
 * @return {number}
 */
function countArrangement(n) {
  const result = [0];
  helper(n, 1, [], result);
  return result[0];
}

function helper(N, index, visited, result) {
  if (index === N + 1) {
    result[0] += 1;
    return;
  }
  for (let i = 1; i <= N; i++) {
    if (!!visited[i] || (index % i !== 0 && i % index !== 0)) {
      continue;
    }
    visited[i] = true;
    helper(N, index + 1, visited, result);
    visited[i] = false;
  }
}

console.log(countArrangement(3));
