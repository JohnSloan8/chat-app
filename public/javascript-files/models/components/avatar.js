import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../../scene/components/scene.js";
import { numberParticipants, posMult } from "../../scene/components/camera.js";
import { animate } from "../../main.js";
import CalculatePositionsRotations from "./positions-rotations.js"

let numAnimations, clip, name, animations, action, gltfLoader;
const participants = {};
window.participants = participants;

export default function setupAvatar() {
	let charactersPosRot = CalculatePositionsRotations(numberParticipants)
	charactersPosRot.forEach(function(v, i) {
		gltfLoader = new GLTFLoader();
		gltfLoader.load("javascript-files/models/resources/man.glb", function(
			gltf
		) {
			v.model = gltf.scene;
			v.model.rotation.set(0, charactersPosRot[i][2], 0);
			//v.model.rotation.set(0, 0, 0);
			v.model.position.set(posMult*charactersPosRot[i][0], 0, posMult*charactersPosRot[i][1]);
			scene.add(v.model);

			v.model.traverse(function(object) {
				if (object.isMesh) {
					object.castShadow = true;
					object.frustumCulled = false;
				}
			});

			//skeleton = new THREE.SkeletonHelper(model);
			//skeleton.visible = true;
			//scene.add(skeleton);

			animations = gltf.animations;
			v.mixer = new THREE.AnimationMixer(v.model);
			numAnimations = animations.length;

			v['allActions'] = [];
			for (let i = 0; i !== numAnimations; ++i) {
				clip = animations[i];
				name = clip.name;
				action = v.mixer.clipAction(clip);
				v['allActions'].push(action);
			}
		});
	});

	//beginAction("stand");
	animate();
}

export { participants };
