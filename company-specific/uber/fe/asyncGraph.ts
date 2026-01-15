function taskA(done: () => void) {
  console.log("Task A Completed");
  done();
}
function taskB(done: () => void) {
  setTimeout(function () {
    console.log("Task B Completed");
    done();
  }, 2000);
}
function taskC(done: () => void) {
  setTimeout(function () {
    console.log("Task C Completed");
    done();
  }, 200);
}
function taskD(done: () => void) {
  console.log("Task D Completed");
  done();
}
function taskE(done: () => void) {
  console.log("Task E Completed");
  done();
}

const asyncGraph = {
  a: {
    task: taskA,
  },
  b: {
    task: taskB,
  },
  c: {
    task: taskC,
  },
  d: {
    dependency: ["a", "b"],
    task: taskD,
  },
  e: {
    dependency: ["c", "d"],
    task: taskE,
  },
};

type TaskNode = {
  dependency?: string[];
  task: (done: any) => void;
};

// Assumption no cycle
function runAsyncGraph(graph: Record<string, TaskNode>, callback: () => void) {
  const visited = new Map<string, Promise<void>>();
  const promises = [];
  for (const id of Object.keys(graph)) {
    // console.log(id);
    if (visited.has(id)) {
      continue;
    }
    promises.push(reverseDfsTaskRun(id, graph, visited));
  }

  Promise.all(promises).then(callback);

  // implement
}

async function reverseDfsTaskRun(id: string, graph: Record<string, TaskNode>, visited: Map<string, Promise<void>>) {
  //   console.log(id, visited);
  if (visited.has(id)) {
    return visited.get(id);
  }

  const dependency = graph[id]?.dependency ?? [];
  const dependencyPromises = dependency.map((dId) => reverseDfsTaskRun(dId, graph, visited));
  const currentTask = graph[id]?.task!;
  const currentPromise = Promise.allSettled(dependencyPromises).then(
    () => new Promise((r) => currentTask(r))
  ) as Promise<void>;

  visited.set(id, currentPromise);

  return currentPromise;
}

console.log("All Start!!!");
runAsyncGraph(asyncGraph, () => console.log("All Done!!!"));
