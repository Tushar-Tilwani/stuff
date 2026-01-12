// ==============================
// Implement this:
// ==============================
function onceAsync(fn) {
  let promise = undefined;

  return async function (...args) {
    if (promise) {
      return promise;
    }
    promise = new Promise(async (resolve, reject) => {
      try {
        const res = await fn(...args);
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
    return promise;
  };
}

// ==============================
// Helpers
// ==============================
function assertEqual(actual, expected, msg) {
  const ok = actual === expected;
  console.log(ok ? "✔️ PASS" : "❌ FAIL", "-", msg);
  if (!ok) {
    console.log("   expected:", expected);
    console.log("   actual:  ", actual);
  }
}

function assert(condition, msg) {
  console.log(condition ? "✔️ PASS" : "❌ FAIL", "-", msg);
  if (!condition) {
    console.log("   assertion failed");
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ==============================
// TESTS
// ==============================
(async () => {
  console.log("\n===== TEST 1: async fn called only once =====");
  let callCount = 0;
  const init = onceAsync(async () => {
    callCount++;
    await delay(50);
    return 123;
  });

  const p1 = init();
  const p2 = init();
  const p3 = init();

  const results = await Promise.all([p1, p2, p3]);
  assertEqual(JSON.stringify(results), JSON.stringify([123, 123, 123]), "all callers get same result");
  assertEqual(callCount, 1, "underlying async fn called only once");

  console.log("\n===== TEST 2: subsequent calls after resolution use cached value =====");
  const v1 = await init();
  const v2 = await init();
  const v3 = await init();
  assertEqual(v1, 123, "v1 ok");
  assertEqual(v2, 123, "v2 ok");
  assertEqual(v3, 123, "v3 ok");
  assertEqual(callCount, 1, "still only called once");

  console.log("\n===== TEST 3: works with sync function =====");
  let syncCount = 0;
  const syncOnce = onceAsync(() => {
    syncCount++;
    return 999;
  });

  const r1 = await syncOnce();
  const r2 = await syncOnce();
  assertEqual(r1, 999, "first sync result");
  assertEqual(r2, 999, "second sync result");
  assertEqual(syncCount, 1, "sync fn only called once");

  console.log("\n===== TEST 4: error propagation and caching =====");
  let errCount = 0;
  const failing = onceAsync(async () => {
    errCount++;
    await delay(10);
    throw new Error("boom");
  });

  let e1, e2;
  try {
    await Promise.all([failing(), failing()]);
  } catch (e) {
    e1 = e;
  }

  assert(errCount === 1, "underlying failing fn only called once");
  assert(e1 instanceof Error && e1.message === "boom", "first callers see error");

  // Future calls should immediately reject with same error
  let e3;
  try {
    await failing();
  } catch (e) {
    e3 = e;
  }
  assert(e3 instanceof Error && e3.message === "boom", "future callers also see same cached error");

  console.log("\n===== ALL TESTS DONE =====\n");
})();
