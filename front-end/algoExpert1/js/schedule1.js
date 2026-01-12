function schedule(fn) {
  const QUEUE = [];
  let working = false;
  async function start() {
    working = true;
    while (QUEUE.length > 0) {
      const [fn, args, resolve, reject] = QUEUE.shift();
      try {
        const result = await fn(...args);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }
    working = false;
  }

  return function (...args) {
    return new Promise((resolve, reject) => {
      QUEUE.push([fn.bind(this), args, resolve, reject]);
      if (!working) {
        start();
      }
    });
  };
}

const slowDouble = async (x) => {
  await new Promise((res) => setTimeout(res, 1000));
  return x * 2;
};

const queuedDouble = schedule(slowDouble);

queuedDouble(1).then(console.log); // prints 2 after 100ms
queuedDouble(2).then(console.log); // prints 4 after ~200ms
queuedDouble(3).then(console.log); // prints 6 after ~300ms
