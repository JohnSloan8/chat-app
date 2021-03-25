import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../../scene/components/scene.js";
import { noP, socialDistance } from "../../scene/components/camera.js";
import { animate } from "../../main.js";
import { posRot } from "../../scene/components/positions-rotations.js"

let numAnimations, clip, name, animations, action, gltfLoader, skeleton;
var participants = {};
window.participants = participants;

export default function setupAvatar() {
	includeTable( posRot[noP].cornerCentreDist, noP+1, posRot[noP].tableRot );
	for(let i=1; i<noP; i++) {
		participants[i] = {}
		gltfLoader = new GLTFLoader();
		gltfLoader.load("javascript-files/models/resources/man.glb", function(
			gltf
		) {
			participants[i].model = gltf.scene;
			participants[i].model.rotation.set(0, posRot[noP][i].rotations[4], 0);
			participants[i].model.position.set(socialDistance*posRot[noP][i].x, 0, socialDistance*posRot[noP][i].z);
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
	};

	//beginAction("stand");
	animate();
}

function includeTable( cCD, sides, zRot ) {

  const geometry = new THREE.CircleGeometry(cCD, sides);
	const material = new THREE.MeshBasicMaterial( { color: 0xaa0a0a } );
	const table = new THREE.Mesh( geometry, material );
	table.position.set(0,1,0)
	table.rotation.set(-Math.PI/2,0,zRot)
	scene.add( table );

}

export { participants };
