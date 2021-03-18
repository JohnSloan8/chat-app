import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer } from "./scene.js"

let camera, controls;

export default function setupCamera() {

	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.1,
		100
	);
	camera.position.set(-3, 1.7, 0);

	controls = new OrbitControls(camera, renderer.domElement);
	//controls.enablePan = false;
	//controls.enableZoom = false;
	controls.target.set(0, 1.7, 0);
	controls.update();

}

export { camera }
