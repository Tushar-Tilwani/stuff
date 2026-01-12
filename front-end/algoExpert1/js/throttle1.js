async function throttle(tasks, maxConcurrency) {
  if (maxConcurrency < 1) {
    throw new Error("maxConcurrency should be atleast 1");
  }
  if (tasks.length === 0) {
    return [];
  }

  const results = [];
  let currentId = 0;
  const runTask = async () => {
    while (true) {
      const nextIndex = currentId++;
      if (nextIndex >= tasks.length) {
        return;
      }
      const result = await tasks[nextIndex]();
      results[nextIndex] = result;
    }
  };

  const workers = [];
  // Sping worket thredes
  for (let i = 0; i < Math.min(tasks.length, maxConcurrency); i++) {
    workers.push(runTask());
  }
  await Promise.all(workers);
  return results;
}

// ----------------------
// You implement this:
// ----------------------
// async function throttle(tasks, maxConcurrency) {}

// ----------------------
// Helper utilities for testing
// ----------------------
function assertEqual(actual, expected, message) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(pass ? "✔️ PASS:" : "❌ FAIL:", message);
  if (!pass) {
    console.log("   Expected:", expected);
    console.log("   Actual:  ", actual);
  }
}

function createTask(id, delay, counter) {
  return () =>
    new Promise((resolve) => {
      if (counter) {
        counter.current++;
        counter.max = Math.max(counter.max, counter.current);
      }

      setTimeout(() => {
        if (counter) counter.current--;
        resolve(id);
      }, delay);
    });
}

// ----------------------
// Test Suite
// ----------------------
(async () => {
  console.log("\n===== TEST 1: Order Preservation =====");
  let tasks1 = [createTask(1, 30), createTask(2, 10), createTask(3, 20), createTask(4, 5)];

  let result1 = await throttle(tasks1, 2);
  assertEqual(result1, [1, 2, 3, 4], "Result order should match input order");

  console.log("\n===== TEST 2: Concurrency Limit =====");
  let counter2 = { current: 0, max: 0 };
  let tasks2 = [
    createTask("A", 50, counter2),
    createTask("B", 50, counter2),
    createTask("C", 50, counter2),
    createTask("D", 50, counter2),
    createTask("E", 50, counter2),
  ];

  let result2 = await throttle(tasks2, 2);
  assertEqual(result2, ["A", "B", "C", "D", "E"], "Should return all results");
  console.log("   Max concurrency reached:", counter2.max);
  console.assert(counter2.max <= 2, "❌ FAIL: concurrency exceeded limit");

  console.log("\n===== TEST 3: maxConcurrency >= tasks =====");
  let tasks3 = [createTask("x", 10), createTask("y", 10), createTask("z", 10)];
  let result3 = await throttle(tasks3, 10);
  assertEqual(result3, ["x", "y", "z"], "Handles large concurrency");

  console.log("\n===== TEST 4: Empty Task List =====");
  let result4 = await throttle([], 3);
  assertEqual(result4, [], "Empty list returns empty list");

  console.log("\n===== TEST 5: Rejection Bubble =====");
  let tasks5 = [
    () => Promise.resolve(1),
    () => new Promise((_, reject) => setTimeout(() => reject(new Error("boom")), 10)),
    () => Promise.resolve(3),
  ];

  try {
    await throttle(tasks5, 2);
    console.log("❌ FAIL: Should have thrown error");
  } catch (err) {
    console.log("✔️ PASS: Error was thrown:", err.message);
  }

  console.log("\n===== TEST 6: Mixed Fast/Slow With Limit =====");
  let counter6 = { current: 0, max: 0 };

  let tasks6 = [
    createTask(1, 5, counter6),
    createTask(2, 50, counter6),
    createTask(3, 5, counter6),
    createTask(4, 5, counter6),
    createTask(5, 50, counter6),
  ];

  let result6 = await throttle(tasks6, 3);
  assertEqual(result6, [1, 2, 3, 4, 5], "Mixed tasks should preserve order");
  console.log("   Max concurrency reached:", counter6.max);
  console.assert(counter6.max <= 3, "❌ FAIL: concurrency exceeded limit");

  console.log("\n===== ALL TESTS COMPLETED =====\n");
})();
