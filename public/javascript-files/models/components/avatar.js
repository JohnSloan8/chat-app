import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../../scene/components/scene.js";
import { noP, group } from "../../scene/components/camera.js";
import { animate } from "../../main.js";
import { posRot } from "../../scene/components/pos-rot.js"
import includeColumn from "../../scene/components/column.js"

let numAnimations, clip, name, animations, action, gltfLoader, skeleton;
var participants = {};
var avatars = ['avatar-man-1', 'avatar-man-2', 'avatar-man-3', 'avatar-woman-1', 'avatar-woman-2', 'avatar-woman-3', ]

export default function setupAvatar() {

	for(let i=1; i<noP; i++) {
		participants[i] = {}
		gltfLoader = new GLTFLoader();
		let randAvatar = avatars.splice(Math.floor(Math.random()*avatars.length), 1)
		gltfLoader.load("javascript-files/models/resources/" + randAvatar + ".glb", function(
			gltf
		) {
			participants[i].model = gltf.scene;
			participants[i].model.traverse(function(object) {
				if (object.isMesh) {
					object.castShadow = true;
					object.frustumCulled = false;
				}
			});

			participants[i].model.rotation.set(0, posRot[noP][i].rotations[i], 0);
			participants[i].model.position.set(posRot[noP][i].x, 0, posRot[noP][i].z);
			group.add(participants[i].model);

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
				//action.setLoop( THREE.LoopOnce )
				//action.clampWhenFinished = true;
				participants[i]['allActions'].push(action);
				participants[i]['currentAngle'] = posRot[noP][i].rotations[i];
				participants[i]['startAngle'] = posRot[noP][i].rotations[i];

				if (clip.name.endsWith( '_pose' )) {
					action.setEffectiveWeight(0)
					//THREE.AnimationUtils.makeClipAdditive( clip );
				}
				action.play()
			}
		});
	};

	scene.add( group )
	//beginAction("stand");
	animate();
}

export { participants }
