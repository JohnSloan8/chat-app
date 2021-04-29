import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import Stats from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/libs/stats.module.js";
import { renderer, scene, stats, clock } from "./scene/components/scene.js"
import { camera } from "./scene/components/camera.js"
import { participants } from "./models/components/avatar.js"
import loadScene from "./scene/load-scene.js"
import loadModels from "./models/load-models.js"
import beginAction from "./animations/utils.js"
import avatarLookAt from "./animations/look.js"
import avatarShake from "./animations/shake.js"
import { morph, blink, expression, testBufferGeom } from "./animations/morph/prepare.js"
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

init();

function init() {
	loadScene()
	loadModels();
}


function animate() {
	try {
		const mixerUpdateDelta = clock.getDelta();
		Object.values(participants).forEach( function(p) {
			p.mixer.update(mixerUpdateDelta);
		})
		stats.update();

		TWEEN.update()

		renderer.render(scene, camera);
		requestAnimationFrame(animate);
	} catch(err) {
		console.log('error:', err)
	}
}

export { animate }
