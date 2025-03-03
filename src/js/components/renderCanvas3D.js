import * as THREE from "three";

const renderCanvas3D = () => {
  const canvas3d = document.querySelector(".canvas3D");
  const canvas3dContainer = document.querySelector(".canvas3D-container");
  // console.log(canvas3dContainer, canvas3dContainer.width);
  // console.log(canvas3d.width);

  const canvasSize = { width: 500, height: 500 };
  // const canvasSize = { width: canvas3dContainer.width, height: canvas3dContainer.height };

  // const canvasSize = { width: document.width, height: 500 };

  // Scene
  const scene = new THREE.Scene();

  // Materials
  const standardMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 1, 0) });

  // Object
  const torusMesh = new THREE.Mesh(new THREE.TorusGeometry(), standardMaterial);
  scene.add(torusMesh);

  // Light
  const directionalLight = new THREE.DirectionalLight([0, 0, 0], 0);
  scene.add(directionalLight);

  // Camera
  const camera = new THREE.PerspectiveCamera(50, canvasSize.width / canvasSize.height);
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // Render
  const render = new THREE.WebGLRenderer({ canvas: canvas3d });
  render.setSize(canvasSize.width, canvasSize.height);

  const clock = new THREE.Clock();
  let previousTime = 0;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    render.render(scene, camera);
    window.requestAnimationFrame(tick);
    // Multiply delta with animation for currect animation speed
  };

  tick();
};

export default renderCanvas3D;
