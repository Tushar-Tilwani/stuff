var TimeMap = function () {
  this.timeMap = new Map();
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  if (!this.timeMap.has(key)) {
    this.timeMap.set(key, []);
  }
  const arr = this.timeMap.get(key);
  arr.push([timestamp, value]);
  arr.sort((a, b) => a[0] - b[0]);
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  if (!this.timeMap.has(key)) {
    return null;
  }
  const arr = this.timeMap.get(key) ?? [];

  const index = bSearch(
    arr.map((a) => a[0]),
    val
  );
  console.log(index);

  if (index < 0) {
    return "";
  }

  return arr[index][1];
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

function bSearch(arr, val) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (arr[mid] === val) {
      return mid;
    }
    if (arr[mid] < val) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}
