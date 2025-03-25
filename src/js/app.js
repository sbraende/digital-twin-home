import renderCanvas3D from "./components/renderCanvas3D";
import renderLights from "./components/renderLights";
import getWeather from "./core/weatherLogic";

document.addEventListener("DOMContentLoaded", () => {
  renderLights();
  renderCanvas3D();
  getWeather();
});
