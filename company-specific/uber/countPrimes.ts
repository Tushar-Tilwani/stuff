function countPrimes(n: number): number {
  let count = 0;
  const isPrimeMemo = new Array(n).fill(true);
  // Noop but problem wants it
  isPrimeMemo[0] = false;
  isPrimeMemo[1] = false;

  for (let i = 2; i < n; i++) {
    if (!isPrimeMemo[i]) {
      continue;
    }
    // Basically assume all number are prime the moment you find one. Mark all it's multiple as false
    count += 1;
    // Mark all multiples of i to be non prime now
    // i*i because all 1 to i have been handled lower primes
    for (let j = i * i; j < n; j += i) {
      // i as already been counted now marking it false doesn't do much
      isPrimeMemo[j] = false;
    }
  }
  return count;
}
