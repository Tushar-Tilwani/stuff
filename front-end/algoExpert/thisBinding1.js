Function.prototype.myCall = function (thisContext, ...args) {
  const key = Symbol("_func");
  thisContext[key] = this;
  const ret = thisContext[key](...args);
  delete thisContext[key];
  return ret;
};

Function.prototype.myApply = function (thisContext, args = []) {
  // Write your code here.
  const key = Symbol("_func");
  thisContext[key] = this;
  const ret = thisContext[key](...args);
  delete thisContext[key];
  return ret;
};

Function.prototype.myBind = function (thisContext, ...args) {
  return (...extraArgs) => {
    return this.myApply(thisContext, [...args, ...extraArgs]);
  };
};
