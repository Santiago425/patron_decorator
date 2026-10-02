import { BasePlan } from "./BasePlan.js";

export class StudentPlan extends BasePlan {
  static ID = "student";
  static TAGLINE = "Lo justo para clases y chats";

  constructor() {
    super({
      name: "Plan Estudiante",
      price: 22000,
      dataGB: 5,
      minutes: 200,
      features: ["SMS ilimitados"]
    });
  }
}
