type Log1 = {
  functionId: number;
  dir: string;
  timestamp: number;
};
function exclusiveTime1(n: number, logs: string[]): number[] {
  const result = new Array(n).fill(0);
  let prevLog: Log | null = null;
  for (const log of logs) {
    const currentLog = parseLog(log);
    if (prevLog === null) {
      prevLog = currentLog;
      continue;
    }
    if (prevLog.dir == "start" && currentLog.dir == "start") {
      const time = currentLog.timestamp - prevLog.timestamp;
      result[prevLog.functionId] += time;
    } else if (prevLog.dir == "end" && currentLog.dir == "start") {
      const time = currentLog.timestamp - prevLog.timestamp - 1;
      result[prevLog.functionId] += time;
    } else if (prevLog.dir == "start" && currentLog.dir == "end") {
      const time = currentLog.timestamp - prevLog.timestamp + 1;
      result[currentLog.functionId] += time;
    } else if (prevLog.dir == "end" && currentLog.dir == "end") {
      const time = currentLog.timestamp - prevLog.timestamp;
      result[currentLog.functionId] += time;
    }
    prevLog = currentLog;
    // console.log(result);
  }
  return result;
}

function parseLog1(log: string): Log {
  const [functionId, dir, timestamp] = log.split(":");

  return { functionId: parseInt(functionId), dir, timestamp: parseInt(timestamp) };
}

/*
8
["0:start:0","1:start:5","2:start:6","3:start:9","4:start:11","5:start:12","6:start:14","7:start:15","1:start:24","1:end:29","7:end:34","6:end:37","5:end:39","4:end:40","3:end:45","0:start:49","0:end:54","5:start:55","5:end:59","4:start:63","4:end:66","2:start:69","2:end:70","2:start:74","6:start:78","0:start:79","0:end:80","6:end:85","1:start:89","1:end:93","2:end:96","2:end:100","1:end:102","2:start:105","2:end:109","0:end:114"]
*/
