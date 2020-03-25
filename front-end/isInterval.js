/**
 * clock.     0.      1,      2,     3,
           FN ---------1.5
    interval   fn     fn     fn    fn

 */

function getNow() {
  return new Date().getTime();
}

function wait(delay) {
  const startTime = getNow();
  while (true) {
    const now = getNow();
    if (now - startTime > delay) {
      break;
    }
  }
}

function intervalRun(fn, time = 1000, executeNumber = 5) {
  const runner = () => {
    let startTime = getNow();
    console.log(executeNumber);
    if (executeNumber < 0) {
      console.log("I am done!!");
      return;
    }

    const sleepTime = Math.floor(2000 * Math.random());

    fn(sleepTime);

    const timeElasped = getNow() - startTime;
    console.log("sleep", sleepTime, "timeElasped", timeElasped);

    executeNumber = executeNumber - Math.ceil(timeElasped / time);
    const waitTime = time - (timeElasped % time);
    console.log("should full number", waitTime + sleepTime);
    wait(waitTime);

    runner();
  };
  return runner;
}

const runner = intervalRun(wait, 1000);
runner();
