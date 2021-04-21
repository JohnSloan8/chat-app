import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { noP, camera } from "../scene/components/camera.js";
import easingDict from "./easings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.avatarMorph = avatarMorph
export default function avatarMorph(who, part, amount, duration, easing) {

	const expressions = Object.keys( participants[who].movableBodyParts.face.morphTargetDictionary )
	console.log('expressions:', expressions)
	let partKey = participants[who].movableBodyParts.face.morphTargetDictionary[part]
	console.log('partKey:', partKey)
	//console.log('typeof partKey:', typeof partKey)
	let newMorphs = Object.assign({}, participants[who].movableBodyParts.face.morphTargetInfluences);
	newMorphs[partKey] = amount
	console.log('newMorphs:', newMorphs)
	let t = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(newMorphs, duration)
		.easing(easingDict[easing])
		.yoyo(true)
		.repeat(1)
		.start();
	//t.onUpdate(function (object) {
		//console.log('object:', object)
	//})
}
