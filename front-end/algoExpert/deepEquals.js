function deepEquals(valueOne, valueTwo) {
  if (
    Object.prototype.toString.call(valueOne) !==
    Object.prototype.toString.call(valueTwo)
  ) {
    return false;
  }
  if (valueOne === valueTwo) {
    return true;
  }

  if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)) {
    return true;
  }

  if (!valueOne || !valueTwo) {
    return false;
  }

  if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    if (valueOne.length !== valueTwo.length) {
      return false;
    }
    let result = true;
    for (let i = 0; i < valueOne.length; i++) {
      result = result && deepEquals(valueOne[i], valueTwo[i]);
    }
    return result;
  }

  if (
    typeof valueOne === "object" &&
    valueOne !== null &&
    typeof valueTwo === "object" &&
    valueTwo !== null
  ) {
    const keys1 = Object.keys(valueOne);
    const keys2 = Object.keys(valueTwo);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!deepEquals(valueOne[key], valueTwo[key])) {
        return false;
      }
    }

    for (const key of keys2) {
      if (!deepEquals(valueOne[key], valueTwo[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

// console.log(
//   deepEquals({ a: [], b: { c: [1, null] } }, { a: [], b: { c: [1, null] } })
// );

console.log(deepEquals([[]], [[]]));
exports = {};

// Do not edit the line below.
exports.deepEquals = deepEquals;
