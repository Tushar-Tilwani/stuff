/**
 * @param {Function} callback - Function to call with the batched data
 * @param {number} size - Maximum number of items before flushing
 * @param {number} timeout - Max time (ms) to wait before flushing
 */
function createBatcher(callback, size, timeout) {
  let batch = [];
  let timer = null;
  const flush = () => {
    clearTimeout(timer);
    callback(batch);
    batch = [];
    timer = null;
  };
  return function (data) {
    batch.push(data);
    if (batch.length === size) {
      flush();
      return;
    }
    if (timer !== null) {
      return;
    }
    timer = setTimeout(flush, timeout);
  };
}

const prev = Date.now();
// Mock Test Case:
const myCallback = (data) => console.log("Flushed:", data, Date.now() - prev);
const b = createBatcher(myCallback, 3, 1000);

b(1);
b(2);
b(3);
setTimeout(() => {
  b(Date.now() - prev);
}, 1000);

for (let i = 0; i < 16; i++) {
  const random = Math.floor(Math.random() * 10000);
  setTimeout(() => {
    b(`dd${random}`);
  }, random);
}

// (If I wait 1000ms here, it should log [1, 2])
// (If I call b(3) immediately, it should log [1, 2, 3])
