const isArray = (value) => Array.isArray(value);
const isObject = (value) =>
  Object.prototype.toString.call(value) === "[object Object]";

function flatten(value) {
  if (isArray(value)) {
    const result = [];
    for (const v of value) {
      if (isArray(v)) {
        result.push(...flatten(v));
      } else if (isObject(v)) {
        result.push(flatten(v));
      } else {
        result.push(v);
      }
    }
    return result;
  }

  if (isObject(value)) {
    const result = {};
    const keys = Object.keys(value);
    for (const key of keys) {
      const v = value[key];
      if (isArray(v)) {
        result[key] = flatten(v);
      } else if (isObject(v)) {
        Object.assign(result, flatten(v));
      } else {
        result[key] = v;
      }
    }
    return result;
  }

  return value;
}

console.log(flatten({ a: {}, b: {} }));

// Do not edit the line below.
exports.flatten = flatten;
