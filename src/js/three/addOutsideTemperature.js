import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import getWeather from "../core/weatherLogic";

const fontLoader = new FontLoader();

const addOutsideTemperature = async (scene) => {
  try {
    const weatherData = await getWeather();
    const temperature = Math.floor(weatherData.main.temp);
    renderOutsideWeatherPuck(scene, temperature);
  } catch (error) {
    const temperature = 7;
    console.log("Using standin temperature of 7");
    renderOutsideWeatherPuck(scene, temperature);
  }
};

const renderOutsideWeatherPuck = (scene, temperature) => {
  const weatherCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 0.2),
    new THREE.MeshStandardMaterial()
  );

  fontLoader.load("/assets/fonts/Inter/json/Inter_18pt_Regular.json", (font) => {
    const textGeometry = new TextGeometry(`${temperature}°`, {
      font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 3,
    });
    textGeometry.center();

    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x85a4ed });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.rotation.set(Math.PI / -2, 0, 0);

    const textGroup = new THREE.Group();
    textGroup.add(text, weatherCylinder);
    textGroup.position.set(1.75, 0, -8);
    scene.add(textGroup);
  });
};

export default addOutsideTemperature;
