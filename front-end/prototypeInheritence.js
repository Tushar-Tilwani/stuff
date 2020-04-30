function Animal() {
  this.noise = "noise";
}

Animal.prototype.getNoise = function() {
  return this.noise;
};

function Cat() {
  this.noise = "meow";
  console.log("In Cat");
}


Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;


function SuperAnimal(noise) {
  this.noise = noise;
  console.log("In Cat");
}

SuperAnimal.prototype = new Animal();
SuperAnimal.prototype.constructor = SuperAnimal;

// const animal = new Animal();
const cat = new Cat();

console.log(cat, cat.getNoise());
