import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import addLights from "../three/addLights";
import { log } from "three/tsl";

const renderCanvas3D = () => {
  const canvas3d = document.querySelector(".canvas3D");
  const canvas3dContainer = document.querySelector(".canvas3D-container");

  // GUI
  // const gui = new GUI();

  // Scene
  const scene = new THREE.Scene();

  const rgbeLoader = new RGBELoader();

  // Env
  rgbeLoader.load("/assets/images/environment/forest.hdr", (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = environmentMap;
    scene.environment = environmentMap;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
  });

  // Objects

  // Light
  addLights(scene, false);

  // Camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  camera.position.set(0, 19, 5);
  scene.add(camera);

  // Load gltf
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("/assets/models/flat/flat_v03.glb", (gltf) => {
    // Traverse through all the childrenof the loaded model
    gltf.scene.traverse((node) => {
      // Check if the node is a mesh
      if (node.isMesh) {
        // Enable shadows for each mesh
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    scene.add(gltf.scene);
  });

  let interfaceLight;

  // gltfLoader.load("/assets/models/interface/interface_v01.glb", (gltf) => {
  //   gltf.scene.layers.set(1);
  //   scene.add(gltf.scene);
  //   interfaceLight = gltf.scene;
  // });

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas3d, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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

  // Raycaster
  const raycaster = new THREE.Raycaster();
  // raycaster.layers.set(1); // Only layer one objects will be intersected.
  const pointer = new THREE.Vector2();

  const onPointerMove = (e) => {
    // console.log(e.clientX);

    pointer.x = (e.clientX / canvas3dContainer.clientWidth) * 2 - 1;
    pointer.y = (e.clientY / canvas3dContainer.clientHeight) * 2 - 1;

    // console.log(pointer.x);
  };

  window.addEventListener("pointermove", onPointerMove);

  // Animation Loop
  const clock = new THREE.Clock();
  const tick = () => {
    // Raycaster
    raycaster.setFromCamera(pointer, camera);
    // const intersects = raycaster.intersectObjects(scene.children);
    // for (let i = 0; i < intersects.length; i++) {
    //   console.log(i);
    //   console.log(intersects);
    //   intersects.forEach((intersect) => {
    //     if (intersect.object.name === "walls") {
    //       console.log("Holi shit, it worked!");
    //     }
    //   });
    // }
    if (interfaceLight) {
      const intersect = raycaster.intersectObject(interfaceLight);
    }

    renderer.render(scene, camera);

    controls.update();
    requestAnimationFrame(tick);
  };

  tick();
};

export default renderCanvas3D;
