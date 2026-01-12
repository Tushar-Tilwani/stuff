const TYPE = {
  START: 0,
  END: 1,
};
function exclusiveTime(n: number, logs: string[]): number[] {
  const sortedLogs = logs.map((log) => {
    const [id, type, time] = log.split(":");
    return [parseInt(id), type === "start" ? TYPE.START : TYPE.END, parseInt(time)] as [number, number, number];
  });
  console.log("sortedLogs", sortedLogs);
  const result = new Array(n).fill(0);
  const STACKID: [number, number][] = [];

  // line sweep
  for (const [id, type, time] of sortedLogs) {
    console.log(STACKID);
    if (type === TYPE.START) {
      STACKID.push([time, 0]);
      continue;
    }
    const [sTime, removeTime] = STACKID.pop()!;
    const totalTime = time - sTime + 1;
    const eTime = totalTime - removeTime;
    result[id] += eTime;
    if (STACKID.length > 0) {
      const [pTime, pRemove] = STACKID.pop()!;
      STACKID.push([pTime, pRemove + totalTime]);
    }
  }
  return result;
}
