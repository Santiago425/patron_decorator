import { StudentPlan } from "./plans/StudentPlan.js";
import { BasicPlan } from "./plans/BasicPlan.js";
import { PlusPlan } from "./plans/PlusPlan.js";
import { ExtraDataDecorator } from "./decorators/ExtraDataDecorator.js";
import { UnlimitedCallsDecorator } from "./decorators/UnlimitedCallsDecorator.js";
import { SocialMediaDecorator } from "./decorators/SocialMediaDecorator.js";
import { StreamingDecorator } from "./decorators/StreamingDecorator.js";
import { RoamingDecorator } from "./decorators/RoamingDecorator.js";
import { DeviceInsuranceDecorator } from "./decorators/DeviceInsuranceDecorator.js";

export const BASE_PLANS = [StudentPlan, BasicPlan, PlusPlan];

export const ADDONS = [
  ExtraDataDecorator,
  UnlimitedCallsDecorator,
  SocialMediaDecorator,
  StreamingDecorator,
  RoamingDecorator,
  DeviceInsuranceDecorator
];

export function findBasePlan(id) {
  return BASE_PLANS.find((Plan) => Plan.ID === id);
}

export function findAddon(id) {
  return ADDONS.find((Addon) => Addon.ID === id);
}

export function buildPlan(BasePlanClass, addonClasses) {
  return addonClasses.reduce((plan, Addon) => new Addon(plan), new BasePlanClass());
}



