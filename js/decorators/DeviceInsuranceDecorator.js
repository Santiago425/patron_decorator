import { PlanDecorator } from "./PlanDecorator.js";

export class DeviceInsuranceDecorator extends PlanDecorator {
  static ID = "device-insurance";
  static LABEL = "Seguro del equipo";
  static DESCRIPTION = "Cubre robo y daño accidental de tu celular.";
  static ICON = "🛡️";
  static COST = 9900;
  static STACKABLE = false;

  getFeatures() {
    return [...super.getFeatures(), "Seguro contra robo y daño accidental del equipo"];
  }
}
