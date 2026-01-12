const TYPE = {
  START: 0,
  END: 1,
};

type Interval = [number, number];
const sortFn = (a: Interval, b: Interval) => {
  if (a[0] === b[0]) {
    return b[1] - a[1];
  }
  return a[0] - b[0];
};
class MyCalendarTwo {
  events: Interval[];
  max: number;
  constructor() {
    this.events = [];
    this.max = 2;
  }

  book(startTime: number, endTime: number): boolean {
    const events = [...this.events];
    events.push([startTime, 0], [endTime, 1]);
    events.sort(sortFn);
    if (!this._lineSweep(events)) {
      return false;
    }
    this.events = events;
    return true;
  }
  _lineSweep(events: Interval[]): boolean {
    const max = this.max;
    let count = 0;
    for (let i = 0; i < events.length; i++) {
      const [, type] = events[i];
      if (type === TYPE.START) {
        count++;
      } else {
        count--;
      }
      if (count > max) {
        return false;
      }
    }
    return true;
  }
}

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(startTime,endTime)
 */
