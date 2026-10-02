import { BasePlan } from "./BasePlan.js";

export class PlusPlan extends BasePlan {
  static ID = "plus";
  static TAGLINE = "Para quien vive conectado";

  constructor() {
    super({
      name: "Plan Plus",
      price: 55000,
      dataGB: 25,
      minutes: 800,
      features: ["SMS ilimitados", "Comparte datos con otro equipo", "Red 5G"]
    });
  }
}
