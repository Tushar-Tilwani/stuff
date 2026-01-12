// ==============================
// Put your implementation here:
// ==============================
function once(fn) {
  let done = false;
  let result = null;
  return function (...args) {
    if (done) {
      return result;
    }
    result = fn.call(this, ...args);
    done = true;
    return result;
  };
}

// ==============================
// Tiny assertion helpers
// ==============================
function assertEqual(actual, expected, msg) {
  const ok = actual === expected;
  console.log(ok ? "✔️ PASS" : "❌ FAIL", "-", msg);
  if (!ok) {
    console.log("   expected:", expected);
    console.log("   actual:  ", actual);
  }
}

function assertThrows(fn, msg) {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
  }
  console.log(threw ? "✔️ PASS" : "❌ FAIL", "-", msg);
  if (!threw) {
    console.log("   expected function to throw");
  }
}

// ==============================
// TESTS
// ==============================

console.log("\n===== TEST 1: Basic behavior =====");
let callCount = 0;
const fn1 = once(() => {
  callCount++;
  return 10;
});

assertEqual(fn1(), 10, "returns correct result on first call");
assertEqual(fn1(), 10, "returns same result on second call");
assertEqual(fn1(), 10, "returns same result on third call");
assertEqual(callCount, 1, "underlying function called only once");

console.log("\n===== TEST 2: Arguments are only used once =====");
const fn2 = once((a, b) => a + b);

assertEqual(fn2(5, 7), 12, "first call uses args (5, 7)");
assertEqual(fn2(100, 200), 12, "second call ignores new args (100, 200)");

console.log("\n===== TEST 3: Preserves `this` context =====");
const obj = {
  x: 7,
  getX: once(function () {
    return this.x;
  }),
};

assertEqual(obj.getX(), 7, "first call sees this.x = 7");
obj.x = 99;
assertEqual(obj.getX(), 7, "subsequent calls still return cached 7");

console.log("\n===== TEST 4: Error behavior on first call =====");
// You can decide the semantics you want here.
// This test just checks consistency.
let first = true;
const fnErr = once(() => {
  if (first) {
    first = false;
    throw new Error("boom");
  }
  return "ok";
});

assertThrows(() => fnErr(), "first call should throw");

// Call again to ensure behavior is at least consistent
try {
  const val = fnErr();
  console.log("Second call after error returned:", val);
} catch (e) {
  console.log("Second call after error also threw:", e.message);
}

console.log("\n===== ALL TESTS DONE =====\n");
