/**
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 */
function isEmpty(value) {
  if (!(typeof value === "object" || typeof value === "string")) {
    return true;
  }

  if (!!value["split"]) {
    return value.split("").length === 0;
  }

  if (!!value["keys"]) {
    return Array.from(value.keys()).length === 0;
  }

  return Object.keys(value).length === 0;
}

console.log(isEmpty("foo"));
