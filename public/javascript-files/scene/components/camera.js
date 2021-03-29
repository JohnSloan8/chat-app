import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer } from "./scene.js"
import calculatePosRot from "./pos-rot.js"
import includeTable from "./table.js"
import includeColumn from "./column.js"
import { posRot } from "./pos-rot.js"
var participants = {};
window.participants = participants;

let camera, controls, noP, radius, angle, cameraYPos, cameraZPos, cameraFov, cameraFocY;

export default function setupCamera() {
	noP = 10
	let table = includeTable(radius, 32, 0)
	let column = includeColumn()
	participants.group = new THREE.Group();
	participants.group.add( table );
	participants.group.add( column );
	calculatePosRot(noP)
	camera = new THREE.PerspectiveCamera(
		posRot[noP].camera.fov,
		window.innerWidth / window.innerHeight,
		0.01,
		100
	);
	camera.position.set(0, posRot[noP].camera.y, posRot[noP].camera.z);
	controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, posRot[noP].camera.yFocus, 0);
	controls.update();
}

function setupParticipants(noP) {
}

const setupSettings = {
	cameraYPos: 1.69,
	cameraFocY: 1.59,
	3: {
		radius: 0.5,
		cameraZPos: 0.1,
		cameraFov: 50,
		angle: 2*Math.PI/3,
	},
	4: {
		radius: 0.7,
		cameraZPos: 0.25,
		cameraFov: 50,
		angle: 2*Math.PI/5,
	},
	5: {
		radius: 0.75,
		cameraZPos: 0.4,
		cameraFov: 50,
		angle: Math.PI/3,
	},
	6: {
		radius: 0.8,
		cameraZPos: 0.5,
		cameraFov: 50,
		angle: 2 * Math.PI/7,
	},
	7: {
		radius: 0.85,
		cameraZPos: 0.6,
		cameraFov: 50,
		angle: Math.PI/4,
	},
	8: {
		radius: 0.95,
		cameraZPos: 0.7,
		cameraFov: 50,
		angle: 2 *Math.PI/9,
	},
	9: {
		radius: 1.05,
		cameraZPos: 0.8,
		cameraFov: 50,
		angle: Math.PI/5,
	},
	10: {
		radius: 1.20,
		cameraZPos: 0.9,
		cameraFov: 50,
		angle: 2*Math.PI/11,
	}
}
window.setupSettings = setupSettings
export { camera, noP, participants, setupSettings }
