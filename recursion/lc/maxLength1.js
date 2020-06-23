/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function(arr) {
  const result = [0];
  allPossible(0, arr, [], result);
  return result[0];
};

/**
 * @param {string[]} arr
 * @return {number}
 */
function allPossible(startIndex, arr, path, result) {
  const pathStr = path.join("");
  if (!isUnique(pathStr)) {
    return;
  }
  if (result[0] < pathStr.length) {
    result[0] = pathStr.length;
  }
  if (startIndex === arr.length) {
    return;
  }

  allPossible(startIndex + 1, arr, path, result);

  path.push(arr[startIndex]);
  allPossible(startIndex + 1, arr, path, result);
  path.pop();
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function isUnique(str) {
  const obj = {};
  for (let z = 0; z < str.length; ++z) {
    const ch = str[z];
    if (obj[ch]) {
      return false;
    } else {
      obj[ch] = true;
    }
  }
  return true;
}

let arr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p"
];
//arr = ["a", "abc", "d", "de", "def"];

console.log(maxLength(arr));
