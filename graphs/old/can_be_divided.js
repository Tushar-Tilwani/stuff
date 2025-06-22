/**
 * @param {int32} num_of_people
 * @param {list_int32} dislike1
 * @param {list_int32} dislike2
 * @return {bool}
 */
function can_be_divided(num_of_people, dislike1, dislike2) {
  const visited = new Array(num_of_people).fill(false);
  const colors = new Array(num_of_people).fill(null);
  const edgeList = getEdgeList(num_of_people, dislike1, dislike2);
  let startColor = 1;
  for (let i = 0; i < num_of_people; i++) {
    if (visited[i]) {
      continue;
    }
    visited[i] = true;
    colors[i] = startColor;
    if (!dfs(i, edgeList, visited, colors)) {
      return false;
    }
    startColor *= -1;
  }

  // Write your code here.
  return true;
}

function dfs(node, edgeList, visited, colors) {
  const neighbours = edgeList.get(node);
  for (const neighbour of neighbours) {
    if (visited[neighbour]) {
      if (colors[neighbour] === colors[node]) {
        return false;
      }
      continue;
    }
    visited[neighbour] = true;
    colors[neighbour] = -1 * colors[node];
    if (!dfs(neighbour, edgeList, visited, colors)) {
      return false;
    }
  }
  return true;
}

function getEdgeList(n, a, b) {
  const edgeList = new Map();

  for (let i = 0; i < n; i++) {
    edgeList.set(i, []);
  }

  for (let i = 0; i < a.length; i++) {
    edgeList.get(a[i]).push(b[i]);
    edgeList.get(b[i]).push(a[i]);
  }

  return edgeList;
}
