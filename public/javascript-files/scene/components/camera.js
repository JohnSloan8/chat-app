import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer } from "./scene.js"
//import { CalculateCameraPosition } from "../../models/components/positions-rotations.js"
//import CalculatePositionsRotations from "./positions-rotations.js"
import { posRot } from "./positions-rotations.js"

let camera, controls, noP, socialDistance;

export default function setupCamera() {

	socialDistance = 0.67;
	noP = 5;
	//let allPosRot = CalculatePositionsRotations( noP, socialDistance )
	//participantPositions = allPosRot[0]
	//participantRotations = allPosRot[1]
	
	//let cameraZPos = 1 * CalculateCameraPosition( noP )
	camera = new THREE.PerspectiveCamera(
		posRot[noP][0].fov,
		window.innerWidth / window.innerHeight,
		0.01,
		100
	);
	//let variableCameraPos = CalculateCameraPosition()
	camera.position.set(0, 1.69, socialDistance*posRot[noP][0].z);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 1.59, 0);
	controls.update();

}

export { camera, noP, socialDistance }
