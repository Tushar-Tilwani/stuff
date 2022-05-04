class Item {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  getId() {
    return this.id;
  }
}

class Category extends Item {
  constructor(id, name, ...dishes) {
    super(id, name);
    this.dishes = dishes;
  }
}

class Dish extends Item {
  constructor(id, name, price, ...options) {
    super(id, name);
    this.price = price;
    this.options = options;
  }
}

class Option extends Item {
  constructor(id, name, price) {
    super(id, name);
    this.price = price;
  }
}

exports.Item = Item;
exports.Category = Category;
exports.Dish = Dish;
exports.Option = Option;
