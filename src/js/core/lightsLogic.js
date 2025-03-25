import { remapValue } from "./mathsFormula";
import testDataLights from "./testDataLights";
import LOCALSERVERURL from "./localServerInfo";

// CORE FUNCTIONS
const getLights = async () => {
  try {
    const req = await fetch(LOCALSERVERURL + "lights");
    const lightsData = await req.json();
    return lightsData;
  } catch (error) {
    console.error(`Could not get lights, is Node server running? ${error}`);
    return testDataLights;
  }
};

const ctToRGB = (ct) => {
  // Formula from ChatGPT
  let kelvin = 1000000 / ct;
  let temp = kelvin / 100;
  let red, green, blue;

  if (temp <= 66) {
    red = 255;
    green = Math.max(0, Math.min(255, 99.4708025861 * Math.log(temp) - 161.1195681661));
    blue =
      temp <= 19
        ? 0
        : Math.max(0, Math.min(255, 138.5177312231 * Math.log(temp - 10) - 305.0447927307));
  } else {
    red = Math.max(0, Math.min(255, 329.698727446 * Math.pow(temp - 60, -0.1332047592)));
    green = Math.max(0, Math.min(255, 288.1221695283 * Math.pow(temp - 60, -0.0755148492)));
    blue = 255;
  }

  return {
    red: Math.round(red),
    green: Math.round(green),
    blue: Math.round(blue),
  };
};

const hueHSBToHSL = (lightDetails) => {
  return {
    hue: remapValue(lightDetails.state.hue, 0, 65535, 0, 360),
    sat: remapValue(lightDetails.state.sat, 0, 254, 0, 100),
    lightness: remapValue(lightDetails.state.bri, 0, 254, 50, 60),
  };
};

const getColorFromLight = (lightDetails) => {
  if (lightDetails.type === "Color temperature light") {
    const { red, green, blue } = ctToRGB(lightDetails.state.ct);
    return `rgb(${red}, ${green}, ${blue})`;
  } else if (lightDetails.type === "Extended color light") {
    const { hue, sat, lightness } = hueHSBToHSL(lightDetails);
    return `hsl(${hue}, ${sat}%, ${lightness}%)`;
  }
};

const setLightState = async (lightId, lightState) => {
  try {
    const req = await fetch(LOCALSERVERURL + "lightState", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lightId, lightState }),
    });
    const res = await req.json();
  } catch (error) {
    console.error(`Could not reach server with PUT: ${error}`);
  }
};

export { getLights, getColorFromLight, setLightState };
