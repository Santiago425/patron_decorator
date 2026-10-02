import { PlanDecorator } from "./PlanDecorator.js";

export class StreamingDecorator extends PlanDecorator {
  static ID = "streaming";
  static LABEL = "Streaming de video";
  static DESCRIPTION = "Suscripción a una plataforma de video y 5 GB exclusivos para verla.";
  static ICON = "🎬";
  static COST = 18000;
  static STACKABLE = false;

  getDataGB() {
    return super.getDataGB() + 5;
  }

  getFeatures() {
    return [...super.getFeatures(), "Plataforma de streaming de video incluida"];
  }
}
