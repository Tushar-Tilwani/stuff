
/*
 * Complete the function below.
 */

/*
    For your reference:
    
    function Node()
    {
        this.val = 0;													
        this.neighbours = [];
    }
*/

function build_other_graph(node) {
    const visited = [];
    const parent = new Map();
    const resultMap = new Map();
    let component = 0;
    dfs(node, parent, visited, component);
    
    Array.from(parent.keys()).forEach(key => {
        const node = new Node();
        node.val = key;
        resultMap.set(key, node);
    });

    for(const [key, node] of resultMap){
        const children = parent.get(key);
        for(let child of children){
            resultMap.get(child).neighbours.push(key);
        }
    }

    console.log(resultMap);
    return new Node(2, [1, 2]);
}

function dfs(node, parent, visited, component) {
    visited[node.val] = component;

    for (let neighbour of node.neighbours) {
        const nVal = neighbour.val
        if (visited[neighbour.val] === undefined) {
            dfs(neighbour, parent, visited, component);
        }
        if (parent.has(nVal)) {
            parent.get(nVal).push(node.val);
        } else {
            parent.set(nVal, [node.val]);
        }
    }
}



