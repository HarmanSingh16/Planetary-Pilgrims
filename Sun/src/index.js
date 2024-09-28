import * as three from "three"
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  LinearSRGBColorSpace,
  ACESFilmicToneMapping,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { Sun } from "./sun";
import { Starfield } from "../src/starfield.js";

const texturePathSun = "../public/assets/sun-map.jpg";
const w = window.innerWidth;
const h = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(75, w / h, 0.1, 100);
const renderer = new WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0;
controls.maxDistance = 60;
camera.position.set(2 * Math.cos(Math.PI / 6), 2 * Math.sin(Math.PI / 3), 30);

const starfield = new Starfield().getStarfield({num: 2000});
scene.add(starfield);



renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = ACESFilmicToneMapping;
renderer.outputColorSpace = LinearSRGBColorSpace;
document.body.appendChild(renderer.domElement);

const sun = new Sun(texturePathSun).getSun();
scene.add(sun);


// const cameraOffset = new three.Vector3(0.0, 5.0, -5.0);
// var objectPosition = new three.Vector3();

// earth.position(objectPosition);

// console.log(objectPosition);
// camera.position.copy(objectPosition).add(cameraOffset);

renderer.render(scene, camera);

window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();
