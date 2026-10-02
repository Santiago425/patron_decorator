import { PlanDecorator } from "./PlanDecorator.js";

export class SocialMediaDecorator extends PlanDecorator {
  static ID = "social-media";
  static LABEL = "Redes sociales sin consumo";
  static DESCRIPTION = "Chats y redes sociales sin gastar tu bolsa de datos.";
  static ICON = "💬";
  static COST = 6000;
  static STACKABLE = false;

  getFeatures() {
    return [...super.getFeatures(), "Mensajería y redes sociales sin consumir datos"];
  }
}
