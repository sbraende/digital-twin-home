import { getLights, getColorFromLight, setLightState } from "../core/lightsLogic";

const renderLights = async () => {
  const lightsListElement = document.querySelector(".lights-list");
  lightsListElement.innerHTML = "";
  const lightsList = await getLights();

  Object.entries(lightsList).forEach((light) => {
    const lightId = light[0];
    const lightDetails = light[1];

    // Create elements
    const lightElement = document.createElement("li");
    const topRowContainer = document.createElement("div");
    const iconAndName = document.createElement("div");
    const lightIcon = document.createElement("img");
    const lightName = document.createElement("h3");
    const switchLabel = document.createElement("label");
    const lightSwitch = document.createElement("input");
    const sliderContainer = document.createElement("div");
    const sliderInput = document.createElement("input");

    // Assign classes
    lightElement.className = "light";
    topRowContainer.className = "light__top-row-container";
    iconAndName.className = "light__icon-and-name";
    lightIcon.className = "light__icon";
    lightName.className = "light__name";
    switchLabel.className = "light__switch-label";
    lightSwitch.className = "light__switch";
    sliderContainer.className = "light__slider-container";
    sliderInput.className = "light__slider-input";

    // Set attributes
    lightElement.style.background = getColorFromLight(lightDetails);

    lightIcon.src = "";
    lightIcon.alt = "";
    lightName.textContent = lightDetails.name;

    switchLabel.setAttribute("for", "light-switch");
    switchLabel.textContent = "Light switch checkbox";
    lightSwitch.type = "checkbox";
    lightSwitch.name = "light__switch";
    lightSwitch.checked = lightDetails.state.on;

    sliderInput.type = "range";
    sliderInput.min = "1";
    sliderInput.max = "254";
    sliderInput.value = lightDetails.state.bri;
    sliderInput.id = "light__slidercontainer-input--all";

    // Append elements
    iconAndName.append(lightIcon, lightName);
    topRowContainer.append(iconAndName, switchLabel, lightSwitch);
    sliderContainer.append(sliderInput);
    lightElement.append(topRowContainer, sliderContainer);

    lightsListElement.append(lightElement);

    // Event listeners
    lightSwitch.addEventListener("change", (e) => {
      if (e.target.checked) {
        setLightState(lightId, { on: true });
      } else {
        setLightState(lightId, { on: false });
      }
    });

    sliderInput.addEventListener("change", (e) => {
      setLightState(lightId, { bri: parseInt(e.target.value) });
    });
  });
};

export default renderLights;
