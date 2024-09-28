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
import { Earth } from "./earth";
import { Planet } from "./planet";
import { Starfield } from "../src/starfield.js";

const planets = [
  {
    orbitSpeed: 0.00048,
    orbitRadius: 10,
    orbitRotationDirection: "clockwise",
    planetSize: 0.0,
    planetRotationSpeed: 0.005,
    planetRotationDirection: "counterclockwise",
    planetTexture: "/solar-system-threejs/assets/mercury-map.jpg",
    rimHex: 0xf9cf9f,
  },
  {
    orbitSpeed: 0.00035,
    orbitRadius: 13,
    orbitRotationDirection: "clockwise",
    planetSize: 0.0,
    planetRotationSpeed: 0.0005,
    planetRotationDirection: "clockwise",
    planetTexture: "/solar-system-threejs/assets/venus-map.jpg",
    rimHex: 0xb66f1f,
  },
  {
    orbitSpeed: 0.00024,
    orbitRadius: 19,
    orbitRotationDirection: "clockwise",
    planetSize: 0.0,
    planetRotationSpeed: 0.01,
    planetRotationDirection: "counterclockwise",
    planetTexture: "/solar-system-threejs/assets/mars-map.jpg",
    rimHex: 0xbc6434,
  }
];

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

const sun = new Sun().getSun();
scene.add(sun);

const earth = new Earth({
  orbitSpeed: 0.00029,
  orbitRadius: 16,
  orbitRotationDirection: "clockwise",
  planetSize: 0.5*1.695,
  planetAngle: (-23.4 * Math.PI) / 180,
  planetRotationSpeed: 0.01,
  planetRotationDirection: "clockwise",
  planetTexture: "./public/assets/kepler.jpg",
}).getPlanet();

scene.add(earth);


// const cameraOffset = new three.Vector3(0.0, 5.0, -5.0);
// var objectPosition = new three.Vector3();

// earth.position(objectPosition);

// console.log(objectPosition);
// camera.position.copy(objectPosition).add(cameraOffset);



planets.forEach((item) => {
  const planet = new Planet(item).getPlanet();
  scene.add(planet);
});

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
