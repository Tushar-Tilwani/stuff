class TimeLimitedCache {
  constructor() {
    this.map = new Map();
    this._checkUnExpired = this._checkUnExpired.bind(this);
  }

  _checkUnExpired(key) {
    const [_, savedTime, duration] = this.map.get(key) || [];
    if (savedTime === undefined) {
      return false;
    }
    const isUnExpired = Date.now() - savedTime < duration;
    if (!isUnExpired) {
      this.map.delete(key);
    }
    return isUnExpired;
  }

  set(key, value, duration) {
    const isUnExpired = this._checkUnExpired(key);
    this.map.set(key, [value, Date.now(), duration]);
    return isUnExpired;
  }

  get(key) {
    if (!this._checkUnExpired(key)) {
      return -1;
    }
    const [value] = this.map.get(key);
    return value;
  }

  count() {
    const allKeys = Array.from(this.map.keys());
    return allKeys.filter(this._checkUnExpired).length;
  }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
