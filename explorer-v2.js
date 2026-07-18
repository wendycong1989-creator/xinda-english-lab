const layerData = {
  drainage: {
    index: "01",
    name: "Drainage aggregate",
    purpose: "Moves leachate toward collection points before hydraulic pressure can build.",
    spec: "Graded aggregate + collection pipe",
    note: "A containment system performs only when liquid has a controlled route out.",
  },
  protection: {
    index: "02",
    name: "Protection geotextile",
    purpose: "Cushions the primary liner against puncture, installation traffic and long-term stress.",
    spec: "Needle-punched nonwoven geotextile",
    note: "Selected by mass, tensile performance and site-specific puncture risk.",
  },
  membrane: {
    index: "03",
    name: "HDPE geomembrane",
    purpose: "Creates the principal low-permeability barrier against liquid and contaminant migration.",
    spec: "Smooth or textured HDPE liner",
    note: "Weldability, resin quality and seam inspection are as important as nominal thickness.",
  },
  gcl: {
    index: "04",
    name: "Geosynthetic clay liner",
    purpose: "Adds a self-sealing bentonite layer beneath the geomembrane for composite containment.",
    spec: "Sodium bentonite GCL",
    note: "Overlap, hydration conditions and confinement determine field performance.",
  },
  clay: {
    index: "05",
    name: "Compacted clay",
    purpose: "Provides a stable, low-permeability foundation and a second line of protection.",
    spec: "Engineered compacted clay layer",
    note: "Moisture, lift thickness and compaction quality must be controlled on site.",
  },
  subgrade: {
    index: "06",
    name: "Prepared subgrade",
    purpose: "Creates the smooth, stable geometry every overlying layer depends on.",
    spec: "Surveyed and compacted formation",
    note: "Remove sharp objects, soft areas and abrupt grade changes before deployment.",
  },
};

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-header nav");
const crossSection = document.querySelector(".cross-section");
const modeSwitch = document.querySelector(".mode-switch");
const systemStatus = document.querySelector(".system-status");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMenu() {
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const open = !menuToggle.classList.contains("is-open");
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});

document.querySelectorAll(".site-header a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

modeSwitch.addEventListener("click", () => {
  const protectedMode = crossSection.classList.contains("is-protected");
  crossSection.classList.toggle("is-protected", !protectedMode);
  crossSection.classList.toggle("is-exposed", protectedMode);
  systemStatus.textContent = protectedMode ? "SYSTEM REMOVED" : "SYSTEM ACTIVE";
  const choices = modeSwitch.querySelectorAll("span");
  choices[0].classList.toggle("active", !protectedMode);
  choices[1].classList.toggle("active", protectedMode);
  choices[1].classList.toggle("danger", protectedMode);
});

function selectLayer(layerId) {
  const data = layerData[layerId];
  if (!data) return;
  document.querySelectorAll("[data-layer]").forEach((button) => {
    button.classList.toggle("active", button.dataset.layer === layerId);
  });
  document.querySelector(".inspector-index").textContent = data.index;
  document.querySelector(".layer-inspector h3").textContent = data.name;
  document.querySelector(".inspector-purpose").textContent = data.purpose;
  document.querySelector(".inspector-spec").textContent = data.spec;
  document.querySelector(".inspector-note").textContent = data.note;
}

document.querySelectorAll("[data-layer]").forEach((button) => {
  button.addEventListener("click", () => selectLayer(button.dataset.layer));
});
