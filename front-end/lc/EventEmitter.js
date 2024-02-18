class EventEmitter {
  constructor() {
    this.eventMap = new Map();
  }
  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    const { eventMap } = this;
    const callbackSet = eventMap.get(eventName) ?? new Set();
    callbackSet.add(callback);
    eventMap.set(eventName, callbackSet);
    return {
      unsubscribe: () => {
        callbackSet.delete(callback);
      },
    };
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    const { eventMap } = this;
    if (!eventMap.has(eventName)) {
      return [];
    }

    const callbacks = Array.from(eventMap.get(eventName).values());
    return callbacks.map((c) => c(...args));
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */
