/**
 * @param {number[]} persons
 * @param {number[]} times
 */
 var TopVotedCandidate = function (persons, times) {
    const votes = new Map();
    const timesMap = new Map();
  
    for (let i = 0; i < times.length; i++) {
      const person = persons[i];
      if (!votes.has(person)) {
        votes.set(person, 0);
      }
      votes.set(person, votes.get(person) + 1);
      const [maxPerson, maxVotes] = [...votes.entries()].reduce((a, e) =>
        e[1] >= a[1] ? e : a
      );
  
      if (votes.get(person) === maxVotes) {
        timesMap.set(times[i], person);
      } else {
        timesMap.set(times[i], maxPerson);
      }
    }
  
    this.timesMap = timesMap;
    this.times = times;
  };
  
  /**
   * @param {number} t
   * @return {number}
   */
  TopVotedCandidate.prototype.q = function (t) {
      const index = search(this.times, t);
      const timeIndex = index === -2 ? this.times.length - 1 : index;
    const timeKey = this.times[timeIndex];
      // console.log(this.times, t, timeKey, search(this.times, t))
    return this.timesMap.get(timeKey);
  };
  
  /**
   * Your TopVotedCandidate object will be instantiated and called as such:
   * var obj = new TopVotedCandidate(persons, times)
   * var param_1 = obj.q(t)
   */
  
  function search(keys, val) {
    return keys.findIndex((key) => val < key) - 1;
  }
  