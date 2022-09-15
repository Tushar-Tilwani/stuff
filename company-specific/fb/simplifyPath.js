/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const paths = path.split("/");
  //   console.log(paths);
  const result = [];
  for (const pathVal of paths) {
    if (pathVal === "..") {
      result.pop();
      continue;
    }
    if (pathVal !== "" && pathVal !== ".") {
      result.push(pathVal);
    }
  }
  return `/${result.join("/")}`;
};
