/**
 * @param {number} length
 */
var SnapshotArray = function (length) {
  this.snapMap = new Map();
  this.arr = new Array(length).fill(0);
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  this.arr[index] = val;
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function () {
  let index = this.snapMap.size;
  const indexMap = this.arr.reduce((acc, v, index) => {
    if (v !== 0) {
      acc.set(index, v);
    }
    return acc;
  }, new Map());
  this.snapMap.set(index, indexMap);
  return index;
};

/**
 * @param {number} index
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  return this.snapMap.get(snap_id).get(index) ?? 0;
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */
