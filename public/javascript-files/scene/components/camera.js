import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer } from "./scene.js"
import calculatePosRot from "./pos-rot.js"
import includeTable from "./table.js"
import includeColumn from "./column.js"
import { posRot } from "./pos-rot.js"
import { noParticipants } from "../../settings/load-settings.js"
let camera, group, controls, radius, angle, cameraYPos, cameraZPos, cameraFov, cameraFocY;

export default function setupCamera() {
	calculatePosRot(noParticipants)
	let table = includeTable(setupSettings[noParticipants].radius, 32, 0)
	//let column = includeColumn(0.01, 10, 0.01, 0xaaaa11)
	group = new THREE.Group();
	group.add( table );
	//group.add( column );
	camera = new THREE.PerspectiveCamera(
		posRot[noParticipants].camera.fov,
		window.innerWidth / window.innerHeight,
		0.01,
		100
	);
	window.camera = camera
	camera.position.set(0, posRot[noParticipants].camera.y, posRot[noParticipants].camera.z);
	controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, posRot[noParticipants].camera.yFocus, 0);
	controls.update();
}

const setupSettings = {
	cameraYPos: 1.69,
	cameraFocY: 1.59,
	2: {
		radius: 0.5,
		cameraZPos: 0.2,
		cameraFov: 40,
		angle: 0,
	},
	3: {
		radius: 0.5,
		cameraZPos: 0.4,
		cameraFov: 40,
		angle: 2*Math.PI/3,
	},
	4: {
		radius: 0.65,
		cameraZPos: 0.5,
		cameraFov: 40,
		angle: 2*Math.PI/5,
	},
	5: {
		radius: 0.75,
		cameraZPos: 0.6,
		cameraFov: 40,
		angle: Math.PI/3,
	},
	6: {
		radius: 0.8,
		cameraZPos: 0.7,
		cameraFov: 40,
		angle: 2 * Math.PI/7,
	},
	7: {
		radius: 0.9,
		cameraZPos: 0.85,
		cameraFov: 40,
		angle: Math.PI/4,
	},
	8: {
		radius: 1,
		cameraZPos: 0.9,
		cameraFov: 40,
		angle: 2 *Math.PI/9,
	},
	9: {
		radius: 1.05,
		cameraZPos: 0.95,
		cameraFov: 40,
		angle: Math.PI/5,
	},
	10: {
		radius: 1.1,
		cameraZPos: 1,
		cameraFov: 40,
		angle: 3*Math.PI/17,
	}
}
window.setupSettings = setupSettings
export { camera, group, setupSettings }
