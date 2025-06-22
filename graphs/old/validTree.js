/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
    const adjList = createAdjList(n, edges);
    const [parent, visited] = initializeParentAndVisitedList(n);
    let component = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i] === -1) {

            if (component > 0) {
                return false;
            }

            if (rDfs(i, component, parent, visited, adjList)) {
                return false;
            }

            component += 1;
        }
    }
    return true;
};

function createAdjList(n, edges) {
    const adjList = [];


    for (let i = 0; i < n; i++) {
        adjList[i] = [];
    }

    edges.forEach(edge => {
        const [src, destination] = edge;
        adjList[src].push(destination);
        adjList[destination].push(src);
    });

    return adjList;
}


function initializeParentAndVisitedList(n) {
    const visited = [];
    const parent = [];

    for (let i = 0; i < n; i++) {
        visited[i] = -1;
        parent[i] = null;
    }

    return [parent, visited];
}



// Returns true if there are cross edges.
function bfs(source, component, parent, visited, adjList) {
    const queue = [source];
    visited[source] = component;

    while (queue.length > 0) {
        const node = queue.shift();
        for (const neighbour of adjList[node]) {
            if (visited[neighbour] === -1) {

                visited[neighbour] = component;
                parent[neighbour] = node;
                queue.push(neighbour);

            } else {
                if (neighbour !== parent[node]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Returns true if there are back edges.
function dfs(source, component, parent, visited, adjList) {
    const stack = [source];
    visited[source] = component;

    while (stack.length > 0) {
        const node = stack.pop();
        for (const neighbour of adjList[node]) {
            if (visited[neighbour] === -1) {
                visited[neighbour] = component;
                parent[neighbour] = node;
                stack.push(neighbour);
            } else {
                if (neighbour !== parent[node]) {
                    return true;
                }
            }
        }
    }
    return false;
}


function rDfs(node, component, parent, visited, adjList) {
    visited[node] = component;
    for (const neighbour of adjList[node]) {
        if (visited[neighbour] === -1) {
            parent[neighbour] = node;
            if (rDfs(neighbour, component, parent, visited, adjList)) {
                return true;
            }
        } else {
            if (neighbour !== parent[node]) {
                return true;
            }
        }
    }
    return false;
}