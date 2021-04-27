import { participants } from "../../models/components/avatar.js"
import { posRot } from "../../scene/components/pos-rot.js"
import { noP, camera } from "../../scene/components/camera.js";
import easingDict from "../easings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.blink = blink
function blink(who, amount=0.7, duration=200, easing="cubicOut") {

	let partKey = participants[who].movableBodyParts.face.morphTargetDictionary["eyesClosed"]
	let newMorphs = Object.assign({}, participants[who].movableBodyParts.face.morphTargetInfluences);
	newMorphs[partKey] = amount
	participants[who].tweens.blink = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(newMorphs, duration)
		.easing(easingDict[easing])
		.yoyo(true)
		.repeat(1)
		.start()
}

const expressionMorphs = {
	'smile': {
		'morphs': {
			"mouthSmile", 1
		},
		'duration': 1000,
		'jaw': false
	},
	'surprise': {
		'morphs': {
			//["eyeWideLeft", 0.5],
			//["eyeWideRight", 0.5],
			"jawOpen": 0.8,
			"browInnerUp": 0.8,
			//["browOuterUpLeft", 1],
			//["browOuterUpRight", 1]
		],
		'duration': 1000,
		'jaw': true
	}
}

window.expression = expression
function expression(who, e) {

	let faceMorphsTo = Object.assign({}, participants[who].blankFaceMorphTargets);
	console.log('faceMorphsTo:', faceMorphsTo)
	expressionMorphs[e].morphs.forEach( function(m) {
		faceMorphsTo[participants[who].movableBodyParts.face.morphTargetDictionary[m[0]]] = m[1]
	})

	let f = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(faceMorphsTo, expressionMorphs[e].duration)
		.easing(easingDict["cubicOut"])
		.start()

	if ( expressionMorphs[e].jaw ) {
		//let teethMorphsTo = Object.assign({}, participants[who].blankFaceMorphTargets);
		//teethMorphsTo[21] = 1;
		f.onStart( function() {
			new TWEEN.Tween(participants[who].movableBodyParts.teeth.morphTargetInfluences).to({"45": expressionMorphs[e].morphs['jawOpen']}, expressionMorphs[e].duration)
			.easing(easingDict["cubicOut"])
			.start()
		})
	}
}

window.morph = morph
function morph(who, target, amount, duration, easing="cubicOut") {

	let partKey = participants[who].movableBodyParts.face.morphTargetDictionary[target]
	let newMorphs = Object.assign({}, participants[who].movableBodyParts.face.morphTargetInfluences);
	newMorphs[partKey] = amount
	let f = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(newMorphs, duration)
		.easing(easingDict[easing])
		.start()
	let t = new TWEEN.Tween(participants[who].movableBodyParts.teeth.morphTargetInfluences).to(newMorphs, duration)
		.easing(easingDict[easing])
		.start()
}

export {morph, blink, expression}
