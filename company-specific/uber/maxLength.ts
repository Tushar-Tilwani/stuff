function maxLength(ribbons: number[], k: number): number {
  const sum = ribbons.reduce((acc, v) => acc + v, 0);
  if (sum < k) {
    return 0;
  }
  if (sum === k) {
    return 1;
  }
  const min = Math.min(...ribbons);
  if (k <= ribbons.length) {
    return min;
  }

  // binary search
  let start = 1;
  let end = min;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (isPossible(ribbons, mid, k)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}

function isPossible(ribbons: number[], tentativeAns: number, k: number) {
  let result = 0;
  for (const ribbon of ribbons) {
    result += Math.floor(ribbon / tentativeAns);
  }
  return result >= k;
}
