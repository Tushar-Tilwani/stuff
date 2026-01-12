// ===========================================
// Put your implementation here:
// ===========================================
function schedule(fn) {
  const QUEUE = [];
  let working = false;
  async function start() {
    working = true;
    while (QUEUE.length > 0) {
      const [ctx, args, resolve, reject] = QUEUE.shift();
      try {
        const result = await fn.call(ctx, ...args);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }
    working = false;
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      QUEUE.push([this, args, resolve, reject]);
      if (!working) {
        start();
      }
    });
  };
}

// ===========================================
// Tiny helpers
// ===========================================
function assert(condition, msg) {
  console.log(condition ? "✔️ PASS" : "❌ FAIL", "-", msg);
  if (!condition) {
    console.log("   assertion failed");
  }
}

function assertEqual(actual, expected, msg) {
  const ok = actual === expected;
  console.log(ok ? "✔️ PASS" : "❌ FAIL", "-", msg);
  if (!ok) {
    console.log("   expected:", expected);
    console.log("   actual:  ", actual);
  }
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// ===========================================
// TESTS
// ===========================================
(async () => {
  console.log("\n===== TEST 1: Basic async sequencing =====");

  let concurrent = 0;
  let maxConcurrent = 0;

  async function slowDouble(x) {
    concurrent++;
    maxConcurrent = Math.max(maxConcurrent, concurrent);
    await delay(50);
    concurrent--;
    return x * 2;
  }

  const queuedDouble = schedule(slowDouble);

  const p1 = queuedDouble(1);
  const p2 = queuedDouble(2);
  const p3 = queuedDouble(3);

  const res = await Promise.all([p1, p2, p3]);

  assertEqual(JSON.stringify(res), JSON.stringify([2, 4, 6]), "results should be in order and correct");
  assert(maxConcurrent === 1, "at most one underlying call should be running at a time");

  console.log("\n===== TEST 2: Works with sync functions as well =====");

  let syncCalls = 0;
  function syncDouble(x) {
    syncCalls++;
    return x * 2;
  }

  const queuedSyncDouble = schedule(syncDouble);

  const s1 = await queuedSyncDouble(10);
  const s2 = await queuedSyncDouble(20);

  assertEqual(s1, 20, "sync result 1 correct");
  assertEqual(s2, 40, "sync result 2 correct");
  assertEqual(syncCalls, 2, "underlying sync fn should be called each time (but sequentially)");

  console.log("\n===== TEST 3: Error propagation =====");

let errorCalls = 0;

async function sometimesFail(x) {
  await delay(10);
  errorCalls++;
  if (x === 2) {
    throw new Error("boom");
  }
  return x;
}

const queuedErrFn = schedule(sometimesFail);

const results = await Promise.allSettled([
  queuedErrFn(1), // should fulfill
  queuedErrFn(2), // should reject
  queuedErrFn(3), // should fulfill, still runs after error
]);

console.log("results:", results);
console.log("errorCalls:", errorCalls);

// Assertions
const statuses = results.map(r => r.status);
assertEqual(
  JSON.stringify(statuses),
  JSON.stringify(['fulfilled', 'rejected', 'fulfilled']),
  "calls should settle as F, R, F in order"
);

assert(
  results[1].status === 'rejected' &&
    results[1].reason instanceof Error &&
    results[1].reason.message === 'boom',
  "second call should reject with boom"
);

assertEqual(
  errorCalls,
  3,
  "all three calls should have been attempted"
);

  console.log("\n===== TEST 4: Preserves `this` context =====");

  const obj = {
    base: 10,
    async addLater(x) {
      await delay(20);
      return this.base + x;
    },
  };

  obj.queuedAddLater = schedule(obj.addLater);

  const v1 = await obj.queuedAddLater(5); // this should be `obj`
  obj.base = 100;
  const v2 = await obj.queuedAddLater(5); // still `this` as obj at call time

  assertEqual(v1, 15, "first call uses base = 10");
  assertEqual(v2, 105, "second call uses updated base = 100");

  console.log("\n===== TEST 5: Many rapid calls, ensure FIFO and single runner =====");

  let order = [];
  let running = 0;
  let maxRunning = 0;

  async function taggedTask(id) {
    running++;
    maxRunning = Math.max(maxRunning, running);
    await delay(10);
    order.push(id);
    running--;
    return id;
  }

  const queuedTagged = schedule(taggedTask);

  const ids = [1, 2, 3, 4, 5, 6];
  const promises = ids.map((id) => queuedTagged(id));
  const out = await Promise.all(promises);

  assertEqual(JSON.stringify(out), JSON.stringify(ids), "returned values should match input order");
  assertEqual(JSON.stringify(order), JSON.stringify(ids), "execution order should be FIFO");
  assert(maxRunning === 1, "only one taggedTask should run at a time");

  console.log("\n===== ALL TESTS DONE =====\n");
})();
