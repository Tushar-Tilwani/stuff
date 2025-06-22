function testLet() {
  console.log(g);
  if (true) {
    return '';
  }
  var g = "3";
}
console.log(testLet());