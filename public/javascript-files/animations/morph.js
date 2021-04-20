import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { noP, camera } from "../scene/components/camera.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.avatarMorph = avatarMorph
export default function avatarMorph(who, part, duration) {

	//const expressions = Object.keys( participants[who].movableBodyParts.face.morphTargetDictionary )
	let partKey = participants[who].movableBodyParts.face.morphTargetDictionary[part]
	console.log('partKey:', partKey)
	//console.log('expressions:', expressions)
	participants[who].movableBodyParts.face.morphTargetInfluences[partKey] = 1;
	//console.log('face:', face)
	//const expressions = Object.keys( face.morphTargetDictionary )
	//let t = new TWEEN.Tween(participants[who]).to(participants[who].rotations[toWhom].head, 0.8*duration)
	//t.easing(TWEEN.Easing.Quintic.Out)
	//t.start();
}
