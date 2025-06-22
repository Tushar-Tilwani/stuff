function getValues(token, str) {
  const result = [];
  let temp = null;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const tempValid = Array.isArray(temp) && temp.length > 0;

    if (char === token) {
      if (tempValid) {
        result.push(parseFloat(temp.join("")));
      }
      temp = [];
      continue;
    }

    const intVal = parseInt(char);

    if (temp && (!isNaN(intVal) || char === ".")) {
      temp.push(char);
      continue;
    }

    if (tempValid) {
      result.push(parseFloat(temp.join("")));
      temp = null;
    }
  }

  return result;
}

console.log(getValues("$", "abc $$$$$1.5$$2.6676$$300 £400 $30$50 abvv cvc"));
