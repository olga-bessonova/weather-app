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

  const unitsSystemToggle = document.getElementById('unitsSystemToggle');
  const tempRadios = document.querySelectorAll('input[name="tempUnit"]');
  const windRadios = document.querySelectorAll('input[name="windUnit"]');
  const precipRadios = document.querySelectorAll('input[name="precipUnit"]');

  function updateToggleState(units) {
    // Only switch to Imperial if ALL three units are imperial
    const isAllImperial = 
      units.temperature === 'fahrenheit' && 
      units.speed === 'mph' && 
      units.precipitation === 'in';
    
    // Only switch to Metric if ALL three units are metric
    const isAllMetric = 
      units.temperature === 'celsius' && 
      units.speed === 'kmh' && 
      units.precipitation === 'mm';
    
    if (unitsSystemToggle) {
      // Only update toggle if all units match (all imperial or all metric)
      // If mixed, keep current toggle state
      if (isAllImperial) {
        unitsSystemToggle.checked = true;
      } else if (isAllMetric) {
        unitsSystemToggle.checked = false;
      }
      // If mixed (not all imperial and not all metric), don't change toggle state
    }
  }

  function setAllUnitsToMetric() {
    const tempRadio = document.querySelector('input[name="tempUnit"][value="celsius"]');
    const windRadio = document.querySelector('input[name="windUnit"][value="kmh"]');
    const precipRadio = document.querySelector('input[name="precipUnit"][value="mm"]');
    
    if (tempRadio) tempRadio.checked = true;
    if (windRadio) windRadio.checked = true;
    if (precipRadio) precipRadio.checked = true;
    
    const metricUnits = { 
      temperature: 'celsius',
      speed: 'kmh',
      precipitation: 'mm'
    };
    
    onUnitsChange(metricUnits, updateToggleState);
  }

  function setAllUnitsToImperial() {
    const tempRadio = document.querySelector('input[name="tempUnit"][value="fahrenheit"]');
    const windRadio = document.querySelector('input[name="windUnit"][value="mph"]');
    const precipRadio = document.querySelector('input[name="precipUnit"][value="in"]');
    
    if (tempRadio) tempRadio.checked = true;
    if (windRadio) windRadio.checked = true;
    if (precipRadio) precipRadio.checked = true;
    
    const imperialUnits = { 
      temperature: 'fahrenheit',
      speed: 'mph',
      precipitation: 'in'
    };
    
    onUnitsChange(imperialUnits, updateToggleState);
  }

  if (unitsSystemToggle) {
    unitsSystemToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        // Toggle is on (Imperial)
        setAllUnitsToImperial();
      } else {
        // Toggle is off (Metric)
        setAllUnitsToMetric();
      }
    });
  }

  tempRadios.forEach(radio => {
    radio.addEventListener("change", e => {
      const partialUnits = { temperature: e.target.value };
      onUnitsChange(partialUnits, updateToggleState);
    });
  });
  
  windRadios.forEach(radio => {
    radio.addEventListener("change", e => {
      const partialUnits = { speed: e.target.value };
      onUnitsChange(partialUnits, updateToggleState);
    });
  });
  
  precipRadios.forEach(radio => {
    radio.addEventListener("change", e => {
      const partialUnits = { precipitation: e.target.value };
      onUnitsChange(partialUnits, updateToggleState);
    });
  });

  // Return function to update toggle state from outside
  return updateToggleState;
}
  
