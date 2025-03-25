import * as THREE from "three";

const addLights = (scene, helper) => {
  const directionalLight = new THREE.DirectionalLight(0xfff8e6, 8.0);

  directionalLight.position.set(-3, 8, -6);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 50;

  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;
  directionalLight.shadow.camera.left = 10;
  directionalLight.shadow.camera.right = -10;
  directionalLight.shadow.bias = -0.001;

  if (helper) {
    const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(dirLightHelper);
  }
};

export default addLights;
