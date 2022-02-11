/**
 * @param {int32} n
 * @param {list_list_int32} prerequisites
 * @return {list_int32}
 */
function course_schedule(n, prerequisites) {
  // Write your code here.
  const { edgeList, inDegreeMapCount } = getEdgeList(n, prerequisites);
  for (let i = 0; i < n; i++) {

  }
  return [];
}

function dfs(){
    
}

function getEdgeList(n, prerequisites) {
  const edgeList = new Map();
  const inDegreeMapCount = new Map();

  for (let i = 0; i < n; i++) {
    edgeList.set(i, []);
    inDegreeMapCount.set(i, 0);
  }

  for (const [course, preq] of prerequisites) {
    edgeList.get(preq).push(course);
    inDegreeMapCount.set(i, inDegreeMapCount.get(i) + 1);
  }

  return { edgeList, inDegreeMapCount };
}
