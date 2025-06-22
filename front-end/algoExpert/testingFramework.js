function describe(testSuiteName, func) {
  // this.testSuiteName = testSuiteName;
  // Write your code here.
  console.log(`beginning test suite ${testSuiteName}`);
  try {
    func();
    console.log(`successfully completed test suite ${testSuiteName}`);
  } catch (e) {
    const { testCaseName, errorMessage } = JSON.parse(e.message);
    console.error(
      `failed running test suite ${testSuiteName} on test case ${testCaseName} with error message ${errorMessage}`
    );
  }
}

function it(testCaseName, func) {
  // Write your code here.
  console.log(`beginning test case ${testCaseName}`);
  try {
    func();
    console.log(`successfully completed test case ${testCaseName}`);
  } catch (e) {
    throw new Error(JSON.stringify({ errorMessage: e.message, testCaseName }));
  }
}

function expect(actual) {
  // Write your code here.
  return {
    toBe: (expected) => {
      if (expected !== actual) {
        const errorMessage = `expected ${JSON.stringify(
          actual
        )} to be ${JSON.stringify(expected)}`;
        throw new Error(errorMessage);
      }
    },
    toExist: () => {
      if (actual == null) {
        const errorMessage = `expected value to exist but got ${actual}`;
        throw new Error(errorMessage);
      }
    },
    toBeType: (type) => {
      const typeOfActual = typeof actual;
      if (typeOfActual !== type) {
        const errorMessage = `expected ${JSON.stringify(
          actual
        )} to be of type ${type} but got ${typeOfActual}`;
        throw new Error(errorMessage);
      }
    },
  };
}

// Do not edit the lines below.
exports.describe = describe;
exports.it = it;
exports.expect = expect;
