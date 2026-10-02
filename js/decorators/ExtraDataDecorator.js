import { PlanDecorator } from "./PlanDecorator.js";

export class ExtraDataDecorator extends PlanDecorator {
  static ID = "extra-data";
  static LABEL = "Paquete +10 GB";
  static DESCRIPTION = "Suma 10 GB a tu bolsa de datos. Puedes agregarlo varias veces.";
  static ICON = "📶";
  static COST = 12000;
  static STACKABLE = true;

  getDataGB() {
    return super.getDataGB() + 10;
  }
}
