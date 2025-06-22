function testEquality(id1, id2) {
  const root1 = document.getElementById(id1);
  const root2 = document.getElementById(id2);
  console.log(bfs(root1, root2));
}

function testEqualityAll() {
  const roots = [1, 2, 3, 4].map(i => document.getElementById(i + ""));
  let result = true;
  for (let i = 1; i < roots.length; i++) {
    result = result && bfs(roots[0], roots[i]);
  }
  console.log(result);
  return result;
}

function bfs(node1, node2) {
  const queue1 = [node1];
  const queue2 = [node2];

  while (queue1.length > 0 && queue2.length > 0) {
    const cNode1 = queue1.shift();
    const cNode2 = queue2.shift();
    if (cNode1.tagName !== cNode2.tagName) {
      return false;
    } else {
      queue1.push(...Array.from(cNode1.childNodes));
      queue2.push(...Array.from(cNode2.childNodes));
    }
  }

  return queue1.length === 0 && queue2.length === 0;
}
