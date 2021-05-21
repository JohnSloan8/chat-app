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

let controls 
export default function initAnimations() {
	allLookAt(0, false)
	createKeyBindings()
	if ( showEntranceAnimation ) {
		camera.position.set(posRot[noParticipants].cameraStart.position.x, posRot[noParticipants].cameraStart.position.y, posRot[noParticipants].cameraStart.position.z);
		cameraEnter();
	} else {
		participants[0].model.visible = false
		camera.position.set(0, posRot[noParticipants].camera.y, posRot[noParticipants].camera.z);
		console.log('camera.position:', camera.position)
		camera.lookAt(cameraSettings.neutralFocus)
	}
	if ( orbitControls ) {
		controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, 1.59, 0);
		controls.update();
		window.controls = controls
	}
	beginRandomBlinking();
	beginRandomSwaying();
}

export { controls }
