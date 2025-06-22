/*
 * Complete the function below.
 */
function min_stack(operations) {
  const STACK = [];
  const ANS = [];
  for (const operation of operations) {
    const STACK_TOP = STACK[STACK.length - 1];
    if (operation === 0) {
      ANS.push(STACK_TOP ? STACK_TOP.min : -1);
      continue;
    }
    if (operation < 0) {
      STACK.pop();
      continue;
    }

    let min = Infinity;
    if (STACK_TOP) {
      min = STACK_TOP.min;
    }
    min = Math.min(min, operation);
    STACK.push({ value: operation, min });
  }
  return ANS;
}

console.log(min_stack([10, 5, 0, -1, 0, -1, 0]));
