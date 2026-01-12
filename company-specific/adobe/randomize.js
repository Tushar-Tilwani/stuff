function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function random(min, max) {
  return min + Math.floor((max - min + 1) * Math.random());
}

var RandomizedCollection = function () {
  this.map = new Map();
  this.values = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function (val) {
  const result = this.map.has(val);
  const indexSet = this.map.get(val) ?? new Set();
  indexSet.add(this.values.length + 1);
  this.map.set(val, indexSet);
  this.values.push(val);
  return result;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function (val) {
  if (!this.map.has(val)) {
    return false;
  }
  const removeIndexs = this.map.get(val) ?? [];
  const removeIndex = removeIndexs.pop();
  swap(this.values, removeIndex, this.values.length - 1);

  this.values.pop();
  if (removeIndexs.length === 0) {
    this.map.delete(val);
  } else {
    this.map.set(val, removeIndexs);
  }
  return true;
};

/**
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function () {};

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = new RandomizedCollection()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
