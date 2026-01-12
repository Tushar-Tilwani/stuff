// -------------------
// Example usage:

/* -----------------------------------------
   Usage:
   const minH = new Heap<number>((a,b) => a - b, [5,3,9,1]);
   minH.push(0);
   console.log(minH.peek()); // 0
   console.log(minH.pop());  // 0
------------------------------------------ */

function shortestSubarray(nums: number[], k: number): number {
  let result = Infinity;
  const MONOTONIC_STACK = [[0, -1]];
  let currentSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const [prevSum, prevIndex] = MONOTONIC_STACK[MONOTONIC_STACK.length - 1];
    if (currentSum - prevSum >= k) {
      result = Math.min(result, i - prevIndex);
    }

    while (MONOTONIC_STACK.length > 0) {
      const [prevSum, prevIndex] = MONOTONIC_STACK[MONOTONIC_STACK.length - 1];
      if (currentSum >= prevSum) {
        // we have a better solution no point in keeping the previous
        MONOTONIC_STACK.pop();
      } else {
        break;
      }
    }

    MONOTONIC_STACK.push([currentSum, i]);
  }
  return isFinite(result) ? result : -1;
}
