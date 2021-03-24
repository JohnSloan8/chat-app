import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer } from "./scene.js"
//import { CalculateCameraPosition } from "../../models/components/positions-rotations.js"
import CalculatePositionsRotations from "./positions-rotations.js"

let camera, controls, numberParticipants, participantPositions, participantRotations;

export default function setupCamera() {

	//posMult = 0.8;
	let socialDistance = 0.75;
	numberParticipants = 4;
	let allPosRot = CalculatePositionsRotations( numberParticipants, socialDistance )
	participantPositions = allPosRot[0]
	participantRotations = allPosRot[1]
	
	//let cameraZPos = 1 * CalculateCameraPosition( numberParticipants )
	camera = new THREE.PerspectiveCamera(
		allPosRot[3],
		window.innerWidth / window.innerHeight,
		0.01,
		100
	);
	//let variableCameraPos = CalculateCameraPosition()
	camera.position.set(0, 1.69, allPosRot[2]);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 1.59, 0);
	controls.update();

}

export { camera, numberParticipants, participantPositions, participantRotations }