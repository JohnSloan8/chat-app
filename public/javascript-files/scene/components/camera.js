import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer } from "./scene.js"
import { posRot } from "./pos-rot.js"
import { noParticipants, cameraSettings, orbitControls } from "../settings.js"

let camera, controls, radius, angle, cameraYPos, cameraZPos, cameraFov, cameraFocY;

export default function setupCamera() {
	camera = new THREE.PerspectiveCamera(
		posRot[noParticipants].camera.fov,
		window.innerWidth / window.innerHeight,
		0.01,
		100
	);
	window.camera = camera
	
	//camera.position.set(0, posRot[noParticipants].camera.y, posRot[noParticipants].camera.z);
	camera.position.set(posRot[noParticipants].cameraStart.position.x, posRot[noParticipants].cameraStart.position.y, posRot[noParticipants].cameraStart.position.z);

	if ( orbitControls ) {
		controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(cameraSettings.neutralFocus);
		controls.update();
	}
}

export { camera }
