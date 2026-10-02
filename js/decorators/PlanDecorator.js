import { MobilePlan } from "../core/MobilePlan.js";

export class PlanDecorator extends MobilePlan {
  constructor(plan) {
    super();
    if (new.target === PlanDecorator) {
      throw new Error("PlanDecorator is abstract");
    }
    if (!(plan instanceof MobilePlan)) {
      throw new TypeError("A decorator can only wrap a MobilePlan");
    }
    this.plan = plan;
  }

  getLabel() {
    return this.constructor.LABEL;
  }

  getExtraCost() {
    return this.constructor.COST;
  }

  getDescription() {
    return `${this.plan.getDescription()} + ${this.getLabel()}`;
  }

  getPrice() {
    return this.plan.getPrice() + this.getExtraCost();
  }

  getDataGB() {
    return this.plan.getDataGB();
  }

  getMinutes() {
    return this.plan.getMinutes();
  }

  getFeatures() {
    return this.plan.getFeatures();
  }

  getBreakdown() {
    return [...this.plan.getBreakdown(), { label: this.getLabel(), price: this.getExtraCost() }];
  }
}
