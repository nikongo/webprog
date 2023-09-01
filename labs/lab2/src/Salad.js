import { v4 as uuid } from 'uuid';

export default class Salad {
  constructor(salad) {
    if (salad) {
      Object.keys(salad).forEach(item => this[item] = salad[item]);
    }
    Object.defineProperty(this, 'id', { value: uuid(), writable: false });
  }

  static parse(salad) {
    const parsed = JSON.parse(salad);
    return Array.isArray(parsed) ? parsed.map(salad => new Salad(salad)) : new Salad(parsed);
  }

  add(name, properties) {
    this[name] = properties;
    return this;
  }
  remove(name) {
    delete this[name];
    return this;
  }
  getPrice() {
    return Object.keys(this).reduce((acc, item) => acc + this[item].price, 0);
  }
  count(prop) {
    return Object.keys(this).filter(item => this[item][prop] === true).length;
  }
}
