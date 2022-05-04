const parser = require("./parse");
const { Category, Option, Dish } = require("./classes");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

class Main {
  constructor() {
    this.categories = [];
    const map = new Map();
    for (const line of parser.getLines()) {
      const item = this._parseItem(line);
      const [, type] = line;
      map.set(item.getId(), item);
      if (type === "CATEGORY") {
        this.categories.push(item);
      }
    }
    this.map = map;
  }

  _parseItem(line) {
    const [id, type, ...params] = line;
    switch (type) {
      case "DISH":
        return new Dish(id, ...params);
      case "CATEGORY":
        return new Category(id, ...params);
      case "OPTION":
        return new Option(id, ...params);
      default:
        return null;
    }
  }

  async getPrice() {
    let input = await prompt(
      "Select category " + this.categories.map((item) => item.getId())
    );
    const dishesIds = this.map.get(input).dishes;
    input = await prompt("Select dishes " + dishesIds);

    const dish = this.map.get(input);

    let price = parseFloat(dish.price);
    const optionIds = dish.options;
    if (optionIds.length > 0) {
      input = await prompt("Select Options " + optionIds);
      const option = this.map.get(input);
      price += parseFloat(option.price);
    }

    console.log("Final Price:", price);
  }
}
const main = new Main();
main.getPrice();
