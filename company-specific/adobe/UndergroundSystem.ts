class UndergroundSystem {
  checkInMap: Map<number, [string, number]>;
  averageTimeMap: Map<string, number[]>;
  constructor() {
    this.checkInMap = new Map<number, [string, number]>();
    this.averageTimeMap = new Map<string, number[]>();
  }

  checkIn(id: number, stationName: string, t: number): void {
    this.checkInMap.set(id, [stationName, t]);
  }

  checkOut(id: number, stationName: string, t: number): void {
    const checkInTuple = this.checkInMap.get(id);
    if (!checkInTuple) {
      return;
    }
    const [checkInStationName, checkInTime] = checkInTuple;
    const key = [checkInStationName, stationName].join();
    const times = this.averageTimeMap.get(key) ?? [];
    times.push(t - checkInTime);
    this.averageTimeMap.set(key, times);
    this.checkInMap.delete(id);
  }

  getAverageTime(startStation: string, endStation: string): number {
    const key = [startStation, endStation].join();
    const times = this.averageTimeMap.get(key) ?? [];
    return times.reduce((acc, val) => acc + val, 0) / times.length;
  }
}

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */
