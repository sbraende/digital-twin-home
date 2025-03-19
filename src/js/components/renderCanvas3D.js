import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const renderCanvas3D = () => {
  const canvas3d = document.querySelector(".canvas3D");
  const canvas3dContainer = document.querySelector(".canvas3D-container");

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
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas3d, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Function to resize canvas
  const resizeCanvas = () => {
    const width = canvas3dContainer.clientWidth;
    const height = canvas3dContainer.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false); // Prevents automatic styling conflicts
  };

  // Observe size changes
  const resizeObserver = new ResizeObserver(resizeCanvas);
  resizeObserver.observe(canvas3dContainer);

  // Controls
  const controls = new OrbitControls(camera, canvas3d);
  controls.enableDamping = true;

  // Animation Loop
  const clock = new THREE.Clock();
  const tick = () => {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(tick);
  };

  tick();
};

export default renderCanvas3D;
