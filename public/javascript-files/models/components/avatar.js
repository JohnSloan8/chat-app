import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "../../scene/components/scene.js";
import { noP, group } from "../../scene/components/camera.js";
import { animate } from "../../main.js";
import { posRot } from "../../scene/components/pos-rot.js"
import includeColumn from "../../scene/components/column.js"
import initAnimations from '../../animations/init.js'
import prepareExpressions from '../../animations/morph/prepare.js'

let numAnimations, clip, name, animations, action, gltfLoader, skeleton;
var participants = {};
window.participants = participants
var avatars = ['avatar-man-2', 'avatar-man-3', 'avatar-woman-1', 'avatar-woman-2', 'avatar-woman-3', ]
const baseActions = {
	//idle: { weight: 1 },
};
const additiveActions = {
	neutral_arm_pose: { weight: 1 },
	right_hand_up_pose: { weight: 0 },
	thinking_pose: { weight: 0 },
	face_palm_pose: { weight: 0 },
	x_pose: { weight: 0 },
	dunno_pose: { weight: 0 },
};

let avatarCount = 1
export default function setupAvatar() {

	loadIndividualGLTF('root-avatar-poses', avatarCount, iterateAvatar)

	scene.add( group )
}

function iterateAvatar() {

	avatarCount += 1;
	if (avatarCount < noP) {
		let randAvatar = avatars.splice(Math.floor(Math.random()*avatars.length), 1)
		loadIndividualGLTF(randAvatar, avatarCount, iterateAvatar)
	} else {
		calculateLookAngles();
	};

}

function loadIndividualGLTF(avatarName, i, cb=null) {

	gltfLoader = new GLTFLoader();
	gltfLoader.load("javascript-files/models/resources/" + avatarName + ".glb", function(
		gltf
	) {
		participants[i] = {}
		participants[i].states = {
			currentlyLookingAt: 0
		}
		participants[i].model = gltf.scene;
		participants[i].model.rotation.set(0, posRot[noP][i].neutralYrotation, 0);
		participants[i].model.position.set(posRot[noP][i].x, 0, posRot[noP][i].z);
		if(i===2) {
			participants[i].model.scale.set(1, 0.9, 1);
		}
		group.add(participants[i].model);
		participants[i].model.traverse(function(object) {
			if (object.isMesh) {
				object.castShadow = false;
				object.frustumCulled = false;
				//console.log('object:', object);
				//object.material.color = {
					//r: 1,
					//g: 1,
					//b: 1,
					//isColor: true
				//}
			}
		});
		addMovableBodyParts(i)
		//skeleton = new THREE.SkeletonHelper(participants[i].model);
		//skeleton.visible = true;
		//scene.add(skeleton);
		if (avatarCount === 1) {
			animations = gltf.animations;
		}
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
		if (cb) {
			//console.log('in callback')
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

function addMovableBodyParts(i) {
	participants[i].movableBodyParts = {}
	participants[i].model.traverse(function(object) {
		if (object.name === "Head") {
			participants[i].movableBodyParts.head = object;
		} else if (object.name === "Spine1") {
			participants[i].movableBodyParts.spine1 = object;
		} else if (object.name === "Spine2") {
			participants[i].movableBodyParts.spine2 = object;
		} else if (object.name === "LeftEye") {
			participants[i].movableBodyParts.leftEye = object;
		} else if (object.name === "RightEye") {
			participants[i].movableBodyParts.rightEye = object;
		} else if  (object.name === "Wolf3D_Head") {
			participants[i].movableBodyParts.face = object;
		} else if  (object.name === "Spine") {
			participants[i].movableBodyParts.spine = object;
		} else if  (object.name === "Wolf3D_Teeth") {
			participants[i].movableBodyParts.teeth = object;
		}
	})
}

function calculateLookAngles() {
	let headMult = 0.15;
	let spine2Mult = 0.1;
	let spine1Mult = 0.1;
	let yMult = 2; //more rotation in y axis - avatars not leaning over each other!
	for (let j=1; j<noP; j++) {
		participants[j].rotations =  {}
		for (let k=0; k<noP; k++) {
			if (j===k) {
				participants[j].rotations[k] = {
					head: {x: 0, y: 0, z: 0},
					spine2: {x: 0, y: 0, z: 0},
					spine1: {x: 0, y: 0, z: 0}
				}
			} else {
				participants[j].rotations[k] = {}
				if (k===0) {
					participants[j].movableBodyParts.head.lookAt(posRot[noP].camera.x, posRot[noP].camera.y, posRot[noP].camera.z)
				} else {
					let direction = new THREE.Vector3();
					let headPos = participants[k].movableBodyParts.head.getWorldPosition(direction)
					participants[j].movableBodyParts.head.lookAt(headPos)
				}
				participants[j].rotations[k].head = {x:participants[j].movableBodyParts.head.rotation.x*headMult, y:participants[j].movableBodyParts.head.rotation.y*headMult*yMult, z:participants[j].movableBodyParts.head.rotation.z*headMult}
				participants[j].rotations[k].spine2 = {x:participants[j].movableBodyParts.head.rotation.x*spine2Mult, y:participants[j].movableBodyParts.head.rotation.y*spine2Mult*yMult, z:participants[j].movableBodyParts.head.rotation.z*spine2Mult}
				participants[j].rotations[k].spine1 = {x:participants[j].movableBodyParts.head.rotation.x*spine1Mult, y:participants[j].movableBodyParts.head.rotation.y*spine1Mult*yMult, z:participants[j].movableBodyParts.head.rotation.z*spine1Mult}
				participants[j].states.currentlyLookingAt = k
			}
		}
	}
	//testBufferGeom()
	prepareExpressions()
	animate()
	initAnimations();
}

export { participants }
