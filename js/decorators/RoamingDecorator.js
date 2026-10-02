import { PlanDecorator } from "./PlanDecorator.js";

export class RoamingDecorator extends PlanDecorator {
  static ID = "roaming";
  static LABEL = "Roaming internacional";
  static DESCRIPTION = "Usa tus datos y minutos cuando viajes por América.";
  static ICON = "✈️";
  static COST = 25000;
  static STACKABLE = false;

  getFeatures() {
    return [...super.getFeatures(), "Roaming de datos y voz en América"];
  }
}
