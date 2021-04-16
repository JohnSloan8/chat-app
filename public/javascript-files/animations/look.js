import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { noP, camera } from "../scene/components/camera.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.avatarLookAt = avatarLookAt
export default function avatarLookAt(who, toWhom, duration) {

	let head = new TWEEN.Tween(participants[who].movableBodyParts.head.rotation).to(participants[who].rotations[toWhom].head, 0.8*duration)
	let spine2 = new TWEEN.Tween(participants[who].movableBodyParts.spine2.rotation).to(participants[who].rotations[toWhom].spine2, 0.9*duration)
	let spine1 = new TWEEN.Tween(participants[who].movableBodyParts.spine1.rotation).to(participants[who].rotations[toWhom].spine1, duration)
	head.easing(TWEEN.Easing.Quintic.Out)
	spine2.easing(TWEEN.Easing.Quintic.Out)
	spine1.easing(TWEEN.Easing.Quintic.Out)
	head.start();
	spine2.start();
	spine1.start();
	let direction = new THREE.Vector3();
	let focalPoint;
	if (toWhom === 0) {
		focalPoint = camera.getWorldPosition(direction)
	} else if (toWhom !== who) {
		focalPoint = participants[toWhom].movableBodyParts.leftEye.getWorldPosition(direction)
		head.onUpdate(function (object) {
			participants[who].movableBodyParts.leftEye.lookAt(focalPoint)
			participants[who].movableBodyParts.rightEye.lookAt(focalPoint)
		})
	}
}
