Function.prototype.myCall = function (thisContext, ...args) {
    const sym = Symbol('_func');
    thisContext[sym] = this;
    const ret = thisContext[sym](...args);
    delete thisContext[sym];
    // Write your code here.
    return ret;
  };
  
  Function.prototype.myApply = function (thisContext, args = []) {
    // Write your code here.
    const sym = Symbol('_func');
    thisContext[sym] = this;
    const ret = thisContext[sym](...args);
    delete thisContext[sym];
    return ret;
  };
  
  Function.prototype.myBind = function (thisContext, ...args) {
    // Write your code here.
    return (...extraArgs) => {
      return this.myCall(thisContext, ...args, ...extraArgs);
    };
  };
  