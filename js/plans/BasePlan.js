import { MobilePlan } from "../core/MobilePlan.js";

export class BasePlan extends MobilePlan {
  constructor({ name, price, dataGB, minutes, features }) {
    super();
    if (new.target === BasePlan) {
      throw new Error("BasePlan is abstract");
    }
    this.name = name;
    this.price = price;
    this.dataGB = dataGB;
    this.minutes = minutes;
    this.features = features;
  }

  getDescription() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getDataGB() {
    return this.dataGB;
  }

  getMinutes() {
    return this.minutes;
  }

  getFeatures() {
    return [...this.features];
  }

  getBreakdown() {
    return [{ label: this.name, price: this.price }];
  }
}
