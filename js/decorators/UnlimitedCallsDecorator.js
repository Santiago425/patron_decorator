import { PlanDecorator } from "./PlanDecorator.js";

export class UnlimitedCallsDecorator extends PlanDecorator {
  static ID = "unlimited-calls";
  static LABEL = "Minutos ilimitados";
  static DESCRIPTION = "Llamadas sin límite a cualquier operador nacional.";
  static ICON = "📞";
  static COST = 8000;
  static STACKABLE = false;

  getMinutes() {
    return Infinity;
  }

  getFeatures() {
    return [...super.getFeatures(), "Llamadas ilimitadas a todo destino nacional"];
  }
}
