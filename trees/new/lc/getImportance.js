/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function (employees, id) {
  const employeeMap = employees.reduce((acc, employee) => {
    acc.set(employee.id, employee);
    return acc;
  }, new Map());

  return dfs(id, employeeMap);
};

function dfs(id, employeeMap) {
  const manager = employeeMap.get(id);
  let totalImportance = manager.importance;

  for (const subordinate of manager.subordinates) {
    totalImportance += dfs(subordinate, employeeMap);
  }

  return totalImportance;
}
