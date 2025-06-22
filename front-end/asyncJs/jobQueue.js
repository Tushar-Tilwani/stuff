/**
 * https://www.udemy.com/course/advanced-javascript-concepts/learn/lecture/13842304#overview
 * Will work in browser
 * Order is below:
 3 is a crowd
 2 hi
"This is the return type"
 1 is the loneliest number
 2 can be as bad as one
 */
function jobQueueExample() {
  // Callback queue (task queue)
  setTimeout(() => {
    console.log("1", "is the loneliest number");
  }, 0);
  setTimeout(() => {
    console.log("2", "can be as bad as one");
  }, 10);

  // 2 Job Queue
  Promise.resolve("hi").then(data => console.log("2", data));

  //3
  console.log("3", "is a crowd");

  return "This is the return type";
}

console.log(jobQueueExample());
