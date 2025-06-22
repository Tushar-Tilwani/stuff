const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class MyPromise {
  #state = STATE.PENDING;
  #value = null;
  #fullfilledCallbacks = [];
  #rejectedCallbacks = [];

  constructor(executorFunc) {
    // Write your code here.
    try {
      executorFunc(
        (value) => this.#resolve(value),
        (err) => this.#reject(err)
      );
    } catch (err) {
      this.#reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfilledCallback = () => {
        queueMicrotask(() => {
          if (!onFulfilled) {
            return resolve(this.#value);
          }
          try {
            resolve(onFulfilled(this.#value));
          } catch (e) {
            reject(e);
          }
        });
      };
      const rejectedCallback = () => {
        queueMicrotask(() => {
          if (!onRejected) {
            return resolve(this.#value);
          }
          try {
            resolve(onRejected(this.#value));
          } catch (e) {
            reject(e);
          }
        });
      };

      switch (this.#state) {
        case STATE.PENDING:
          this.#fullfilledCallbacks.push(fulfilledCallback);
          this.#rejectedCallbacks.push(rejectedCallback);
          break;
        case STATE.FULFILLED:
          fulfilledCallback();
          break;
        case STATE.REJECTED:
          rejectedCallback();
          break;
        default:
          throw new Error("Unexpected");
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  get state() {
    return this.#state;
  }

  get value() {
    return this.#value;
  }

  #resolve(value) {
    this.#value = value;
    this.#state = STATE.FULFILLED;
    this.#fullfilledCallbacks.forEach((cb) => cb());
  }

  #reject(err) {
    this.#value = err;
    this.#state = STATE.REJECTED;
    this.#rejectedCallbacks.forEach((cb) => cb());
  }
}

// Do not edit the line below.
exports.MyPromise = MyPromise;
