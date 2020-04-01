const getPromise = (args, shouldResolve = true, timer = 1000) =>
  new Promise((resolve, reject) => {
    if (shouldResolve) {
      setTimeout(resolve, timer, args);
    } else {
      setTimeout(reject, timer, args);
    }
  });

async function asyncCaller() {
  let result = await getPromise("1");
  console.log(result);
  result = await getPromise("2");
  console.log(result);

  try {
    result = await getPromise("3", false);
    console.log(result);
  } catch (e) {
    console.log("error", e);
  }

  result = await getPromise("4");
  console.log(result);
}
function syncCaller() {
  console.log("Some Text");
}

asyncCaller();
syncCaller();
