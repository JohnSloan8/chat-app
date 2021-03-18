import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../../scene/components/scene.js";
import { animate } from "../../main.js";

let numAnimations, clip, name, animations, action, gltfLoader;
const participants = {
	jim: {},
	jack: {},
	joe: {},
	jeff: {},
};
window.participants = participants;
const positions = [
	[-0.31, -0.95],
	[0.81, -0.59],
	[0.81, 0.59],
	[-0.31, 0.95],
];
const angle = [36, -54, -126, 144]

export default function setupAvatar() {
	Object.values(participants).forEach(function(v, i) {
		gltfLoader = new GLTFLoader();
		gltfLoader.load("javascript-files/models/resources/man.glb", function(
			gltf
		) {
			v.model = gltf.scene;
			v.model.rotation.set(0, angle[i] * Math.PI/180, 0);
			v.model.position.set(positions[i][0], 0, positions[i][1]);
			scene.add(v.model);

			v.model.traverse(function(object) {
				if (object.isMesh) object.castShadow = true;
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
