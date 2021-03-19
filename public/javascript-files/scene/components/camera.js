import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer } from "./scene.js"
import { CalculateCameraPosition } from "../../models/components/positions-rotations.js"

let camera, controls, numberParticipants, posMult;

export default function setupCamera() {

	posMult = 0.8;
	numberParticipants = 3;
	let cameraZPos = 1 * CalculateCameraPosition( numberParticipants )
	camera = new THREE.PerspectiveCamera(
		65,
		window.innerWidth / window.innerHeight,
		0.01,
		100
	);
	let variableCameraPos = CalculateCameraPosition()
	camera.position.set(0, 1.69, posMult*cameraZPos);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 1.69, 0);
	controls.update();

}

export { camera, numberParticipants, posMult }
