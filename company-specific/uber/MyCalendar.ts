class MyCalendar1 {
  meetings: [number, string][];
  constructor() {
    this.meetings = [];
  }

  book(startTime: number, endTime: number): boolean {
    const newMeetings = [...this.meetings];
    newMeetings.push([startTime, "s"]);
    newMeetings.push([endTime, "e"]);
    newMeetings.sort((a, b) => {
      if (a[0] === b[0]) {
        return b[1].localeCompare(a[1]);
      }
      return a[0] - b[0];
    });
    let prev = null;
    for (let i = 0; i < newMeetings.length; i++) {
      const current = newMeetings[i][1];
      if (current === prev) {
        return false;
      }
      prev = current;
    }

    this.meetings = newMeetings;

    return true;
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
