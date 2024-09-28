import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import getStarfield from "../src/getStarfield.js";
import {getFresnelMat} from "../src/getFresnelMat.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(74,w/h,0.1,1000)
camera.position.z=2;
const renderer = new three.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

//Earth group
const earthGroup = new three.Group();
earthGroup.rotation.z = -23.4 * Math.PI /180;
scene.add(earthGroup);



//Orbit controls
new OrbitControls(camera,renderer.domElement);
const detail = 4;
const loader = new three.TextureLoader();
const geometry = new three.IcosahedronGeometry(1.0,12);
const material = new three.MeshStandardMaterial(
    {
        map: loader.load("../assets/kepler.jpg")
    }
);
//Earth mesh
const earthMesh = new three.Mesh(geometry,material);
earthGroup.add(earthMesh);

//Light material
// const lightsMat= new three.MeshBasicMaterial({
//     map: loader.load("../textures/03_earthlights4k.jpg"),
//     blending: three.AdditiveBlending,
// });
// const lightsMesh = new three.Mesh(geometry,lightsMat);
// earthGroup.add(lightsMesh);

//glow
const fresnelMat = getFresnelMat({rimHex:0xd27d2d, facingHex:0xb87333});
const glowMesh = new three.Mesh(geometry,fresnelMat);
glowMesh.scale.setScalar(1.002);
earthGroup.add(glowMesh);

//stars
const stars = getStarfield({numStars: 2000});
scene.add(stars);
// d87150
const sunLight = new three.DirectionalLight(0xffffffff);
sunLight.position.set(-2, -0.5,1.5);
scene.add(sunLight);
function animate() {
    requestAnimationFrame(animate);

    earthMesh.rotation.y += 0.001;
    earthMesh.rotation.y +=0.002
    glowMesh.rotation.y += 0.02;
    renderer.render(scene,camera);
}

animate();

function handleWindowResize()
{
    
    camera.aspect= window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowResize());