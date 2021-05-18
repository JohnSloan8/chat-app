import { participants } from "../../models/components/avatar.js"
import { posRot } from "../../scene/components/pos-rot.js"
import { camera } from "../../scene/components/camera.js";
import easingDict from "../easings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.blink = blink
export default function blink(who, amount=0.7, duration=200, easing="cubicOut") {

	let partKey = participants[who].movableBodyParts.face.morphTargetDictionary["eyesClosed"]
	let newMorphs = Object.assign({}, participants[who].movableBodyParts.face.morphTargetInfluences);
	newMorphs[partKey] = amount
	participants[who].tweens.blink = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(newMorphs, duration)
		.easing(easingDict[easing])
		.yoyo(true)
		.repeat(1)
		.start()
}
