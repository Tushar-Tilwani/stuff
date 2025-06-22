Promise.myRace = function (promises) {
  // Write your code here.
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise.then(
        (val) => resolve(val),
        (err) => reject(err)
      );
    }
  });
};

Promise.myAny = function (promises) {
  // Write your code here.
  let rejectCount = 0;
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise.then(
        (val) => resolve(val),
        () => {
          rejectCount += 1;
          if (rejectCount === promises.length) {
            reject("all promises rejected");
          }
        }
      );
    }
  });
};

Promise.myAll = function (promises) {
  // Write your code here.
  const acceptedResults = new Array(promises.length).fill(null);
  let acceptedCount = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise.then(
        (val) => {
          acceptedCount += 1;
          acceptedResults[i] = val;
          if (acceptedCount === promises.length) {
            resolve(acceptedResults);
          }
        },
        (err) => reject(err)
      );
    }
  });
};

Promise.myAllSettled = function (promises) {
  // Write your code here.
  const results = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise.then(
        (value) => {
          count += 1;
          results[i] = { value, status: "fulfilled" };
          if (count === promises.length) {
            resolve(results);
          }
        },
        (error) => {
          count += 1;
          results[i] = { error, status: "rejected" };
          if (count === promises.length) {
            resolve(results);
          }
        }
      );
    }
  });
};
