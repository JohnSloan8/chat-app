import { participants } from "../../models/components/avatar.js"
import { posRot } from "../../scene/components/pos-rot.js"
import { noP, camera } from "../../scene/components/camera.js";
import easingDict from "../easings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'


window.testBufferGeom = testBufferGeom
function testBufferGeom() {

	let copyJawOpenPosition	= participants[2].movableBodyParts.face.geometry.morphAttributes.position[45].array
	const newMorphTargetPosition = new THREE.Float32BufferAttribute( copyJawOpenPosition, 3 );
	let copyJawOpenNormal	= participants[2].movableBodyParts.face.geometry.morphAttributes.normal[45].array
	const newMorphTargetNormal = new THREE.Float32BufferAttribute( copyJawOpenNormal, 3 );

	//let copyJawNormalPosition	= participants[1].movableBodyParts.face.geometry.morphAttributes.normal[45].array.slice()
	//participants[1].movableBodyParts.face.geometry.setAttribute('position', new THREE.BufferAttribute(copyJawOpenPosition, 3))
	//participants[1].movableBodyParts.face.geometry.setAttribute('normal', new THREE.BufferAttribute(copyJawNormalPosition, 3))
	participants[2].movableBodyParts.face.geometry.morphAttributes.position = [...participants[2].movableBodyParts.face.geometry.morphAttributes.position, newMorphTargetPosition]
	participants[2].movableBodyParts.face.geometry.morphAttributes.normal = [...participants[2].movableBodyParts.face.geometry.morphAttributes.normal, newMorphTargetNormal]
	participants[2].movableBodyParts.face.morphTargetDictionary['surprise'] = 63
	participants[2].movableBodyParts.face.morphTargetInfluences = [...participants[2].movableBodyParts.face.morphTargetInfluences, 0]
	//participants[1].movableBodyParts.face.geometry.morphAttributes.normal.push(copyJawNormalPosition)
	let eyeWideLeftPos = participants[2].movableBodyParts.face.geometry.morphAttributes.position[26].array  
	let eyeWideLeftNor = participants[2].movableBodyParts.face.geometry.morphAttributes.normal[26].array  
	//let eyeWideRightPos = participants[2].movableBodyParts.face.geometry.morphAttributes.position[27]  
	//let eyeWideRightNor = participants[2].movableBodyParts.face.geometry.morphAttributes.normal[27]  
	participants[2].movableBodyParts.face.geometry.morphAttributes.position[63].array = participants[2].movableBodyParts.face.geometry.morphAttributes.position[63].array.map(function(num, idx) {
		return num + eyeWideLeftPos[idx]
	}) 
	participants[2].movableBodyParts.face.geometry.morphAttributes.normal[63].array = participants[2].movableBodyParts.face.geometry.morphAttributes.normal[63].array.map(function(num, idx) {
		return num + eyeWideLeftNor[idx]
	}) 
	//participants[2].movableBodyParts.face.geometry.morphAttributes.normal[63] += eyeWideLeftNor
}

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
	"mouthSmile": {
		'jaw': false
	},
	'surprise': {
		'jaw': true
	}
}

window.expression = expression
function expression(who, e) {

	let faceMorphsFrom = Object.assign({}, participants[who].blankFaceMorphTargets);
	let faceMorphsHalf = Object.assign({}, participants[who].blankFaceMorphTargets);
	let faceMorphsTo = Object.assign({}, participants[who].blankFaceMorphTargets);
	faceMorphsTo[participants[who].movableBodyParts.face.morphTargetDictionary[e]] = 1
	faceMorphsHalf[participants[who].movableBodyParts.face.morphTargetDictionary[e]] = 1/3
	console.log('faceMorphsTo:', faceMorphsTo)

	let expressionIn = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(faceMorphsTo, 500)
		.easing(easingDict["cubicOut"])

	let expressionOut = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(faceMorphsHalf, 1500)
		.easing(easingDict["cubicOut"])
		.delay(3000)
	
	expressionIn.chain(expressionOut)
	expressionIn.start()

	if ( expressionMorphs[e].jaw ) {
		expressionIn.onStart( function() {
			new TWEEN.Tween(participants[who].movableBodyParts.teeth.morphTargetInfluences).to({"45": 1}, 500)
			.easing(easingDict["cubicOut"])
			.start()
		})
		expressionOut.onStart( function() {
			new TWEEN.Tween(participants[who].movableBodyParts.teeth.morphTargetInfluences).to({"45": 0}, 1500)
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

export {morph, blink, expression, testBufferGeom}
