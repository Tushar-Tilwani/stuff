function shipWithinDays(weights: number[], days: number): number {
  let start = Math.max(...weights);
  let end = weights.reduce((acc, weight) => weight + acc, 0);
    // console.log(start, end);
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const expectedDays = getDays(weights, mid);
      // console.log(expectedDays, mid);
    if (days < expectedDays) {
       start = mid + 1;
    } else {
     
        
        end = mid - 1;
    }
  }
  return start;
}

function getDays(weights: number[], capacity: number) {
  let current = 0;
  let days = 0;
  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];
    if (current + weight > capacity) {
      days++;
      current = 0;
    }
    current += weights[i];
  }

  return days + 1;
}