import { BasePlan } from "./BasePlan.js";

export class BasicPlan extends BasePlan {
  static ID = "basic";
  static TAGLINE = "El más elegido para el día a día";

  constructor() {
    super({
      name: "Plan Básico",
      price: 35000,
      dataGB: 10,
      minutes: 400,
      features: ["SMS ilimitados", "Comparte datos con otro equipo"]
    });
  }
}
