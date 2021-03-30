import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import Stats from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/libs/stats.module.js";
import { renderer, scene, stats, clock } from "./scene/components/scene.js"
import { camera } from "./scene/components/camera.js"
import { participants } from "./models/components/avatar.js"
import loadScene from "./scene/load-scene.js"
import loadModels from "./models/load-models.js"
import beginAction from "./animations/utils.js"

init();

function init() {
	loadScene()
	loadModels();
}


function animate() {
	requestAnimationFrame(animate);
	const mixerUpdateDelta = clock.getDelta();
	Object.values(participants).forEach( function(p) {
		p.mixer.update(mixerUpdateDelta);
	})
	stats.update();

	renderer.render(scene, camera);
}

export { animate }
