import { unitsBtn, unitsMenu, tempUnitRadios } from "./domElements.js";

export function initUnits(onUnitChange) {
  unitsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    unitsMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!unitsMenu.contains(e.target) && !unitsBtn.contains(e.target)) {
      unitsMenu.classList.add("hidden");
    }
  });

  tempUnitRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      const isMetric = e.target.value === "celsius";
      onUnitChange(isMetric);
    });
  });
}
