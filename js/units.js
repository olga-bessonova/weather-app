import { unitsBtn, unitsMenu, tempUnitRadios } from "./domElements.js";

export function initUnits(onUnitsChange) {

  unitsBtn.addEventListener("click", (e)=>{
    e.stopPropagation();
    unitsMenu.classList.toggle('hidden');
  })

  document.addEventListener("click", (e) => {
    if (!unitsMenu.contains(e.target) && !unitsBtn.contains(e.target)){
      unitsMenu.classList.add('hidden');
    }
  })
    document.querySelectorAll('input[name="tempUnit"]').forEach(radio => {
      radio.addEventListener("change", e => {
        onUnitsChange({ temperature: e.target.value });
      });
    });
  
    document.querySelectorAll('input[name="windUnit"]').forEach(radio => {
      radio.addEventListener("change", e => {
        onUnitsChange({ speed: e.target.value });
      });
    });
  
    document.querySelectorAll('input[name="precipUnit"]').forEach(radio => {
      radio.addEventListener("change", e => {
        onUnitsChange({ precipitation: e.target.value });
      });
    });
  }
  
