import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer } from "./scene.js"

let camera, controls;

export default function setupCamera() {

	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.5,
		100
	);
	camera.position.set(-3.0, 1.6, 0);

	controls = new OrbitControls(camera, renderer.domElement);
	//controls.enablePan = false;
	//controls.enableZoom = false;
	controls.target.set(0, 1.1, 0);
	controls.update();

}

export { camera }
