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
  const employeeMap = employees.reduce((map, employee) => {
    map.set(employee.id, employee);
    return map;
  }, new Map());
  return dfs(id, employeeMap);
};

function dfs(currentEmployeeId, employeeMap) {
  const currEmployee = employeeMap.get(currentEmployeeId);
  let sum = currEmployee.importance;
  for (const subordinateId of currEmployee.subordinates) {
    sum += dfs(subordinateId, employeeMap);
  }
  return sum;
}
