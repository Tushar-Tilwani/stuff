type Log = {
  functionId: number;
  dir: string;
  timestamp: number;
};
function exclusiveTime(n: number, logs: string[]): number[] {
  const STACK: [Log, number][] = [];

  const result = new Array(n).fill(0);
  for (const log of logs) {
    const currentLog = parseLog(log);
    if (currentLog.dir == "start") {
      STACK.push([currentLog, 0]);
      continue;
    }
    const [prevLog, timeToRemove] = STACK.pop() as [Log, number];
    const time = currentLog.timestamp - prevLog.timestamp + 1;
    result[currentLog.functionId] += time - timeToRemove;

    if (STACK.length > 0) {
      const [root, rootTimeToRemove] = STACK.pop() as [Log, number];
      STACK.push([root, rootTimeToRemove + time]);
    }
  }
  return result;
}

function parseLog(log: string): Log {
  const [functionId, dir, timestamp] = log.split(":");

  return { functionId: parseInt(functionId), dir, timestamp: parseInt(timestamp) };
}
