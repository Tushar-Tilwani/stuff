function shipWithinDays(weights: number[], days: number): number {
  let start = Math.min(...weights);
  let end = weights.reduce((acc, w) => acc + w);

  while (start < end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midDays = getDays(weights, mid);
    if (midDays === days) {
      return mid;
    }
    if (midDays > days) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

function getDays(weights: number[], capacity: number) {
  let days = 1;
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    if (sum + weights[i] > capacity) {
      sum = 0;
      days += 1;
    }
    sum += weights[i];
  }
  return days;
}
