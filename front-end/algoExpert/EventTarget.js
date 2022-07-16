class EventTarget {
  // Write your code here.

  constructor() {
    this.eventMap = new Map();
  }

  addEventListener(name, callback) {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, new Set());
    }
    // Write your code here.
    this.eventMap.get(name).add(callback);
  }

  removeEventListener(name, callback) {
    // Write your code here.
    this.eventMap.get(name).delete(callback);
  }

  dispatchEvent(name) {
    // Write your code here.
    const callbackSet = this.eventMap.get(name);
    if (callbackSet === undefined) {
      return;
    }
    const callbacks = Array.from(callbackSet.values());
    for (const callback of callbacks) {
      callback();
    }
  }
}

// Do not edit the line below.
exports.EventTarget = EventTarget;
