const serverURL = "http://localhost:3000/";

const getLights = async () => {
  try {
    const res = await fetch(serverURL + "lights");
    const data = await res.json();
    renderLights(data);
  } catch (error) {
    console.error(`Could not get lights: ${error}`);
  }
};

const renderLights = (lightsList) => {
  const lightsListElement = document.querySelector(".lights-list"); // Assuming there's a container for lights
  console.log(lightsList);

  Object.entries(lightsList).forEach((light) => {
    const lightDetails = light[1];

    // Create elements
    const lightItem = document.createElement("li");
    const topRowContainer = document.createElement("div");
    const iconAndName = document.createElement("div");
    const lightIcon = document.createElement("img");
    const lightName = document.createElement("h3");
    const switchLabel = document.createElement("label");
    const lightSwitch = document.createElement("input");
    const sliderContainer = document.createElement("div");
    const sliderInput = document.createElement("input");

    // Assign classes
    lightItem.className = "light";
    topRowContainer.className = "light__top-row-container";
    iconAndName.className = "light__icon-and-name";
    lightIcon.className = "light__icon";
    lightName.className = "light__name";
    switchLabel.className = "light__switch-label";
    lightSwitch.className = "light__switch";
    sliderContainer.className = "light__slider-container";
    sliderInput.className = "light__slider-input";

    // Set attributes and content
    lightIcon.src = "";
    lightIcon.alt = "";
    lightName.textContent = lightDetails.name;

    switchLabel.setAttribute("for", "light-switch");
    switchLabel.textContent = "Light switch checkbox";
    lightSwitch.type = "checkbox";
    lightSwitch.name = "light__switch";
    lightSwitch.id = "light__switch";
    lightSwitch.checked = lightDetails.state.on;

    sliderInput.type = "range";
    sliderInput.min = "1";
    sliderInput.max = "254";
    sliderInput.value = lightDetails.state.bri;
    sliderInput.id = "light__slidercontainer-input--all";

    // Append elements in correct structure
    iconAndName.append(lightIcon, lightName);
    topRowContainer.append(iconAndName, switchLabel, lightSwitch);
    sliderContainer.append(sliderInput);
    lightItem.append(topRowContainer, sliderContainer);

    // Append everything to the light list container
    lightsListElement.append(lightItem);

    // Eventlistener
    lightSwitch.addEventListener("change", (e) => {
      if (e.target.checked) {
        console.log("Light is on");
        toggleLight(light[0], true);
      } else {
        console.log("light is off");
        toggleLight(light[0], false);
      }
    });
  });
};

const toggleLight = async (lightId, isOn) => {
  try {
    const req = await fetch(serverURL + "setLight", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lightId, isOn }),
    });
    const res = await req.json();
    console.log(res);
  } catch (error) {
    console.error(`Could not reach server with PUT: ${error}`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderLights(getLights());
});
