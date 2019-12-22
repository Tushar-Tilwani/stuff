

/*
 * Complete the 'course_schedule' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 */

function course_schedule(n, prerequisites) {
    // Write your code here
    const adjList = getAdjList(n, prerequisites);

    const [visited, result, arrival, departure] = initializeVistedAndResult(n);

    let component = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i] === -1) {
            const hasCycle = dfs(i, adjList, component, visited, arrival, departure, result);
            if (hasCycle) {
                return [-1];
            }
        }
        component += 1;
    }


    const finalResult = [];

    for (let i = 0; i < component; i++) {
        finalResult.push(...result[i]);
    }

    return finalResult;
}

let c = 0;

function dfs(node, adjList, component, visited, arrival, departure, result) {
    visited[node] = component;
    const neigbhours = adjList[node];
    arrival[node] = c++;

    for (let neigbhour of neigbhours) {
        if (visited[neigbhour] === -1) {
            if (dfs(neigbhour, adjList, component, visited, arrival, departure, result)) {
                return true;
            }
        } else {
            if (departure[neigbhour] === null) {
                return true;
            }
        }
    }
    result[component].push(node);
    departure[node] = c++;

    return false;
}

function getAdjList(n, prerequisites) {
    const adjList = [];
    for (let i = 0; i < n; i++) {
        adjList[i] = [];
    }

    for (let [course, preq] of prerequisites) {
        adjList[course].push(preq);
    }

    return adjList;
}


function initializeVistedAndResult(n) {
    const visited = [];
    const result = [];
    const arrival = [];
    const departure = [];

    for (let i = 0; i < n; i++) {
        visited[i] = -1;
        result[i] = [];
        arrival[i] = null;
        departure[i] = null;

    }

    return [visited, result, arrival, departure];
}

// 0 1
// 0 3
// 3 1
// 3 2

// console.log(course_schedule(4, [[0, 1], [0, 3], [3, 1], [3, 2]]));