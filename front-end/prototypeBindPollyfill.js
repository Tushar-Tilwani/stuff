Function.prototype.bind = function(newThis) {
  // console.log(this);
  return () => {
    // console.log(this, Function.prototype.call(this));
    return this.call(newThis);
  };
};

function A() {
  this.name = "suraj";
}
A.prototype.showName = function() {
  return this.name;
};

a = new A();
console.log(a.showName());
console.log("s");
bShowName = a.showName.bind({ name: "ravi" });
console.log("s", bShowName(), a.showName.call({ name: "ravi" }));
