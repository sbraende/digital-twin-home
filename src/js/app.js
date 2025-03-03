import renderCanvas3D from "./components/renderCanvas3D";
import renderLights from "./components/renderLights";

document.addEventListener("DOMContentLoaded", () => {
  renderLights();
  renderCanvas3D();
});
