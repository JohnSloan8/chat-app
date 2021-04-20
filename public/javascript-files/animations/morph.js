import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { noP, camera } from "../scene/components/camera.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.avatarMorph = avatarMorph
export default function avatarMorph(who, part, duration) {

	//const expressions = Object.keys( participants[who].movableBodyParts.face.morphTargetDictionary )
	//console.log('expressions:', expressions)
	let partKey = participants[who].movableBodyParts.face.morphTargetDictionary[part].toString()
	console.log('partKey:', partKey)
	let t = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to({"40":1}, duration)
	t.easing(TWEEN.Easing.Quintic.Out)
	t.start();
}
