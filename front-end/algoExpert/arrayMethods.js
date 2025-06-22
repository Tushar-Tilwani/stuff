Array.prototype.myMap = function (callback) {
  const result = [];
  const srcArr = this;
  for (let i = 0; i < srcArr.length; i++) {
    result.push(callback(srcArr[i], i, srcArr));
  }
  return result;
};

Array.prototype.myFilter = function (callback) {
  const result = [];
  const srcArr = this;
  for (let i = 0; i < srcArr.length; i++) {
    if (callback(srcArr[i], i, srcArr) === true) {
      result.push(srcArr[i]);
    }
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  const srcArr = this;
  let result = initialValue ?? srcArr[0];
  const startIndex = initialValue !== undefined ? 0 : 1;
  for (let i = startIndex; i < srcArr.length; i++) {
    result = callback(result, srcArr[i], i, srcArr);
  }
  return result;
};
