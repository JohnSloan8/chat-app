import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import {allLookAt} from "./test.js"
import avatarLookAt from "./look.js"
import cameraLookAt from "./camera/keyboard.js"
import createKeyBindings from "./camera/keyboard.js"
import { showEntranceAnimation, noParticipants, cameraSettings, orbitControls } from "../scene/settings.js"
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/controls/OrbitControls.js";
import { renderer, scene } from "../scene/components/scene.js"
import { camera } from "../scene/components/camera.js"
import beginRandomBlinking from "./random/blink.js"
import beginRandomSwaying from "./random/sway.js"
import { initialiseVisemeMorphIndexes, randomBlinking, randomSwaying } from "./settings.js"
import { table } from "../scene/components/table.js"

let controls 
export default function initAnimations() {
	createKeyBindings()
	if ( showEntranceAnimation ) {
		camera.position.set(posRot[noParticipants].cameraStart.position.x, posRot[noParticipants].cameraStart.position.y, posRot[noParticipants].cameraStart.position.z);
		setTimeout(cameraEnter, 1000);
	} else {
		participants[0].model.visible = false
		camera.position.set(0, posRot[noParticipants].camera.y, posRot[noParticipants].camera.z);
		camera.lookAt(cameraSettings.neutralFocus)
	}
	for (let k=1; k<noParticipants; k++) {
		let direction = new THREE.Vector3();
		let headPos = participants[k].movableBodyParts.head.getWorldPosition(direction)
		camera.lookAt(headPos)
		posRot[noParticipants].camera.rotations[k] = {
			x: camera.rotation.x * 0.075 - 0.075,
			y: camera.rotation.y * 0.15,
		}
	}
	// look at table
	let tableDirection = new THREE.Vector3();
	let tablePos = table.getWorldPosition(tableDirection)
	camera.lookAt(tablePos)
	posRot[noParticipants].camera.rotations[-1] = {
		x: camera.rotation.x * 0.5,
		y: camera.rotation.y * 0.15,
	}
	if ( orbitControls ) {
		controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, 1.59, 0);
		controls.update();
		window.controls = controls
	}
	if ( randomBlinking ) {
		beginRandomBlinking();
	}
	if ( randomSwaying ) {
		beginRandomSwaying();
	}
	allLookAt(-1, false)
}

export { controls }
