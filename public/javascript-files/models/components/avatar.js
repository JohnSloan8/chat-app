import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../../scene/components/scene.js";
import { noP, group } from "../../scene/components/camera.js";
import { animate } from "../../main.js";
import { posRot } from "../../scene/components/pos-rot.js"
import includeColumn from "../../scene/components/column.js"

let numAnimations, clip, name, animations, action, gltfLoader, skeleton;
var participants = {};
window.participants = participants
var avatars = ['avatar-man-2', 'avatar-man-3', 'avatar-woman-1', 'avatar-woman-2', 'avatar-woman-3', ]
const baseActions = {
	//idle: { weight: 1 },
};
const additiveActions = {
	neutral_arm_pose: { weight: 1 },
	left_up_pose: { weight: 0 },
	left_down_pose: { weight: 0 },
	right_up_pose: { weight: 0 },
	right_down_pose: { weight: 0 },
};

let avatarCount = 1
export default function setupAvatar() {

	loadIndividualGLTF('avatar-man-1-edited-a-frame', avatarCount, iterateAvatar)

	scene.add( group )
}

function iterateAvatar() {

	avatarCount += 1;
	if (avatarCount < noP) {
		let randAvatar = avatars.splice(Math.floor(Math.random()*avatars.length), 1)
		loadIndividualGLTF(randAvatar, avatarCount, iterateAvatar)
	} else {
		for (let j=1; j<noP; j++) {
			participants[j].model.traverse(function(object) {
				//console.log('name:', object.name)
				if (object.name === "RightEye") {
					//let direction = new THREE.Vector3();
					//let position = object.getWorldPosition(direction)
					//console.log(position.x + ',' + position.y + ',' + position.z);
					object.lookAt(0.2866225747437305,1.615352232842075,-0.5667132320422056)
				}
			})
		}
		animate()
	};

}

function loadIndividualGLTF(avatarName, i, cb=null) {

	gltfLoader = new GLTFLoader();
	gltfLoader.load("javascript-files/models/resources/" + avatarName + ".glb", function(
		gltf
	) {
		participants[i] = {}
		participants[i].model = gltf.scene;
		participants[i].model.rotation.set(0, posRot[noP][i].rotations[i], 0);
		participants[i].model.position.set(posRot[noP][i].x, 0, posRot[noP][i].z);
		if(i===2) {
			participants[i].model.scale.set(1, 0.6, 1);
		}
		group.add(participants[i].model);
		participants[i].model.traverse(function(object) {
			if (object.isMesh) {
				object.castShadow = true;
				object.frustumCulled = false;
				//console.log('object:', object);
			}
		});
		//var box = new THREE.Box3().setFromObject( participants[i].model );
		//console.log( box.getSize() )
		let face = participants[i].model.getObjectByName( 'Wolf3D_Head' );
		//console.log('face:', face)
		const expressions = Object.keys( face.morphTargetDictionary )
		//console.log('expressions:', expressions)
		skeleton = new THREE.SkeletonHelper(participants[i].model);
		skeleton.visible = true;
		scene.add(skeleton);
		if (avatarCount === 1) {
			animations = gltf.animations;
		}
		console.log('animations:', animations)
		participants[i].mixer = new THREE.AnimationMixer(participants[i].model);
		numAnimations = animations.length;
		participants[i]['allActions'] = [];
		for (let j = 0; j !== numAnimations; ++j) {
			clip = animations[j].clone();
			name = clip.name;
			if ( baseActions[ name ] ) {
				const action = participants[i].mixer.clipAction( clip );
				activateAction( action );
				baseActions[ name ].action = action;
				participants[i]['allActions'].push(action);
			} else if ( additiveActions[ name ] ) {
				// Make the clip additive and remove the reference frame
				THREE.AnimationUtils.makeClipAdditive( clip );
				if ( clip.name.endsWith( '_pose' ) ) {
					clip = THREE.AnimationUtils.subclip( clip, clip.name, 2, 3, 30 );
				}
				const action = participants[i].mixer.clipAction( clip );
				activateAction( action );
				additiveActions[ name ].action = action;
				participants[i]['allActions'].push(action);
			}
		}
		participants[i]['currentAngle'] = posRot[noP][i].rotations[i];
		participants[i]['startAngle'] = posRot[noP][i].rotations[i];
		if (cb) {
			console.log('in callback')
			cb();
		}
	});

}

function activateAction( action ) {

	const clip = action.getClip();
	const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
	setWeight( action, settings.weight );
	action.play();

}

function setWeight( action, weight ) {

	action.enabled = true;
	action.setEffectiveTimeScale( 1 );
	action.setEffectiveWeight( weight );

}

export { participants }
