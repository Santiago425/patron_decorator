import { BASE_PLANS, ADDONS, findBasePlan, findAddon, buildPlan } from "./catalog.js";

const state = {
  baseId: BASE_PLANS[1].ID,
  addonIds: []
};

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const elements = {
  basePlans: document.getElementById("base-plans"),
  addons: document.getElementById("addons"),
  total: document.getElementById("total"),
  description: document.getElementById("description"),
  data: document.getElementById("stat-data"),
  minutes: document.getElementById("stat-minutes"),
  features: document.getElementById("features"),
  breakdown: document.getElementById("breakdown"),
  activeAddons: document.getElementById("active-addons"),
  layers: document.getElementById("layers"),
  code: document.getElementById("code"),
  reset: document.getElementById("reset")
};

function countAddon(id) {
  return state.addonIds.filter((addonId) => addonId === id).length;
}

function currentPlan() {
  return buildPlan(findBasePlan(state.baseId), state.addonIds.map(findAddon));
}

function formatMinutes(minutes) {
  return Number.isFinite(minutes) ? `${minutes} min` : "Ilimitados";
}

function renderBasePlans() {
  elements.basePlans.innerHTML = BASE_PLANS.map((Plan) => {
    const plan = new Plan();
    const selected = Plan.ID === state.baseId;
    return `
      <button type="button" class="plan-card ${selected ? "is-selected" : ""}" data-base="${Plan.ID}" aria-pressed="${selected}">
        <span class="plan-card__name">${plan.getDescription()}</span>
        <span class="plan-card__tagline">${Plan.TAGLINE}</span>
        <span class="plan-card__price">${money.format(plan.getPrice())}<small>/mes</small></span>
        <span class="plan-card__specs">${plan.getDataGB()} GB · ${formatMinutes(plan.getMinutes())}</span>
      </button>`;
  }).join("");
}

function renderAddons() {
  elements.addons.innerHTML = ADDONS.map((Addon) => {
    const count = countAddon(Addon.ID);
    const disabled = !Addon.STACKABLE && count > 0;
    return `
      <article class="addon ${count > 0 ? "is-active" : ""}">
        <div class="addon__icon" aria-hidden="true">${Addon.ICON}</div>
        <div class="addon__body">
          <h3>${Addon.LABEL} ${count > 1 ? `<span class="badge">x${count}</span>` : ""}</h3>
          <p>${Addon.DESCRIPTION}</p>
          <code class="addon__class">${Addon.name}</code>
        </div>
        <div class="addon__action">
          <span class="addon__price">+${money.format(Addon.COST)}</span>
          <button type="button" class="btn btn--small" data-add="${Addon.ID}" ${disabled ? "disabled" : ""}>
            ${disabled ? "Agregado" : "Agregar"}
          </button>
        </div>
      </article>`;
  }).join("");
}

function renderSummary() {
  const plan = currentPlan();

  elements.total.textContent = money.format(plan.getPrice());
  elements.description.textContent = plan.getDescription();
  elements.data.textContent = `${plan.getDataGB()} GB`;
  elements.minutes.textContent = formatMinutes(plan.getMinutes());

  elements.features.innerHTML = plan.getFeatures().map((feature) => `<li>${feature}</li>`).join("");

  elements.breakdown.innerHTML = plan.getBreakdown().map((item, index) => `
    <tr>
      <td>${index === 0 ? "Base" : `Capa ${index}`}</td>
      <td>${item.label}</td>
      <td>${index === 0 ? "" : "+"}${money.format(item.price)}</td>
    </tr>`).join("");

  elements.activeAddons.innerHTML = state.addonIds.length
    ? state.addonIds.map((id, index) => `
        <li class="chip">
          <span>${index + 1}. ${findAddon(id).LABEL}</span>
          <button type="button" data-remove="${index}" aria-label="Quitar ${findAddon(id).LABEL}">×</button>
        </li>`).join("")
    : `<li class="empty">Aún no has agregado servicios. Tu plan es solo el componente base.</li>`;

  renderLayers();
}

function renderLayers() {
  const BasePlanClass = findBasePlan(state.baseId);
  const addonClasses = state.addonIds.map(findAddon);

  const nested = addonClasses.reduce(
    (inner, Addon) => `<div class="layer"><span class="layer__name">${Addon.name}</span>${inner}</div>`,
    `<div class="layer layer--core"><span class="layer__name">${BasePlanClass.name}</span></div>`
  );
  elements.layers.innerHTML = nested;

  const expression = addonClasses.reduce(
    (inner, Addon) => `new ${Addon.name}(${inner})`,
    `new ${BasePlanClass.name}()`
  );
  elements.code.textContent = `const plan = ${expression};\nplan.getPrice(); // ${currentPlan().getPrice()}`;
}

function render() {
  renderBasePlans();
  renderAddons();
  renderSummary();
}

elements.basePlans.addEventListener("click", (event) => {
  const card = event.target.closest("[data-base]");
  if (!card) return;
  state.baseId = card.dataset.base;
  render();
});

elements.addons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  state.addonIds.push(button.dataset.add);
  render();
});

elements.activeAddons.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  state.addonIds.splice(Number(button.dataset.remove), 1);
  render();
});

elements.reset.addEventListener("click", () => {
  state.baseId = BASE_PLANS[1].ID;
  state.addonIds = [];
  render();
});

render();
