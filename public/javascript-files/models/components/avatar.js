import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../../scene/components/scene.js";
import { numberParticipants, participantPositions, participantRotations } from "../../scene/components/camera.js";
import { animate } from "../../main.js";
import CalculatePositionsRotations from "./positions-rotations.js"

let numAnimations, clip, name, animations, action, gltfLoader, skeleton;
var participants = {};
window.participants = participants;

export default function setupAvatar() {
	//let charactersPosRot = CalculatePositionsRotations(numberParticipants)
	//charactersPosRot.forEach(function(v, i) {
	participantPositions.forEach(function(p, i) {
		participants[i] = {}
		gltfLoader = new GLTFLoader();
		gltfLoader.load("javascript-files/models/resources/man.glb", function(
			gltf
		) {
			participants[i].model = gltf.scene;
			participants[i].model.rotation.set(0, participantRotations[i], 0);
			//participants[i].model.rotation.set(0, 0, 0);
			participants[i].model.position.set(participantPositions[i][0], 0, participantPositions[i][1]);
			scene.add(participants[i].model);

			participants[i].model.traverse(function(object) {
				if (object.isMesh) {
					object.castShadow = true;
					object.frustumCulled = false;
				}
			});

			skeleton = new THREE.SkeletonHelper(participants[i].model);
			skeleton.visible = true;
			scene.add(skeleton);

			animations = gltf.animations;
			participants[i].mixer = new THREE.AnimationMixer(participants[i].model);
			numAnimations = animations.length;

			participants[i]['allActions'] = [];
			for (let j = 0; j !== numAnimations; ++j) {
				clip = animations[j];
				name = clip.name;
				action = participants[i].mixer.clipAction(clip);
				participants[i]['allActions'].push(action);
			}
		});
	});

	//beginAction("stand");
	animate();
}

export { participants };
