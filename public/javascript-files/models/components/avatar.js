import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../../scene/components/scene.js";
import { animate } from "../../main.js";

let model, skeleton, animations, mixer, numAnimations;
const allActions = [];
var movementController = {
	move: false,
	rotation: {
		bool: false,
		x: 0,
		y: 0,
		z: 0
	},
	position: {
		bool: true,
		x: -0.04,
		y: 0,
		z: 0
	},
}
window.allActions = allActions;
window.movementController = movementController;

export default function setupAvatar() {
	var gltfLoader = new GLTFLoader();
	gltfLoader.load("javascript-files/models/resources/woman-dsd.glb", function(
		gltf
	) {
		model = gltf.scene;
		model.scale.set(0.03, 0.03, 0.03);
		model.rotation.set(0, -1.5708, 0);
		model.position.set(0, 0, 0);
		scene.add(model);

		model.traverse(function(object) {
			if (object.isMesh) object.castShadow = true;
		});

		//skeleton = new THREE.SkeletonHelper(model);
		//skeleton.visible = true;
		//scene.add(skeleton);

		animations = gltf.animations;
		mixer = new THREE.AnimationMixer(model);
		window.mixer = mixer

		numAnimations = animations.length;

		for (let i = 0; i !== numAnimations; ++i) {
			let clip = animations[i];
			const name = clip.name;
			const action = mixer.clipAction(clip);
			allActions.push(action);
		}

		beginAction("stand");
		animate();
	});
}

export { allActions, numAnimations, mixer, model, movementController };
