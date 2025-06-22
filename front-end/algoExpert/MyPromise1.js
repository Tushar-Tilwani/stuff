const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  #value = null;
  #status = STATE.PENDING;
  #fullfilledCallbacks = [];
  #rejectedCallbacks = [];

  constructor(executorFunc) {
    // Write your code here.
    executorFunc(args);
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fullfilledCallback = () => {
        queueMicrotask(() => {
          if (!onFulfilled) {
            return resolve(this.value);
          }
          return resolve(onFulfilled(this.value));
        });
      };

      const rejectedCallback = () => {
        queueMicrotask(() => {
          if (!onFulfilled) {
            return reject(this.value);
          }
          return reject(onRejected(this.value));
        });
      };

      switch (this.state) {
        case STATE.PENDING:
          this.#fullfilledCallbacks.push(fullfilledCallback);
          this.#rejectedCallbacks.push(rejectedCallback);
          break;
        case STATE.FULFILLED:
          this.#resolve();
        case STATE.REJECTED:
          this.#reject();
      }
    });
    // Write your code here.
  }

  catch(onRejected) {
    // Write your code here.
    return this.then(null, onRejected);
  }

  get state() {
    return this.#status;
  }

  get value() {
    return this.#value;
  }

  #resolve(args) {
    this.#value = args;
    this.#status = STATE.FULFILLED;
    this.#fullfilledCallbacks.forEach((callback) => callback());
  }

  #reject(args) {
    this.#value = args;
    this.#status = STATE.PENDING;
    this.#rejectedCallbacks.forEach((callback) => callback());
  }
}

// Do not edit the line below.
exports.MyPromise = MyPromise;
