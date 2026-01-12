/**
 * Definition for Employee.
 * class Employee {
 *     id: number
 *     importance: number
 *     subordinates: number[]
 *     constructor(id: number, importance: number, subordinates: number[]) {
 *         this.id = (id === undefined) ? 0 : id;
 *         this.importance = (importance === undefined) ? 0 : importance;
 *         this.subordinates = (subordinates === undefined) ? [] : subordinates;
 *     }
 * }
 */

function getImportance(employees: Employee[], id: number): number {
  // const employeeMap = new Map<number, Employee>();
  const employeeMap = employees.reduce((acc, employee) => {
    acc.set(employee.id, employee);
    return acc;
  }, new Map<number, Employee>());
  // console.log(employeeMap);

  return dfs(id, employeeMap);
}

function dfs(id: number, employeeMap: Map<number, Employee>) {
  let employee = employeeMap.get(id)!;
  let sum = employee.importance;
  const subordinates = employee.subordinates;
  for (const subordinate of subordinates) {
    sum += dfs(subordinate, employeeMap);
  }
  return sum;
}
