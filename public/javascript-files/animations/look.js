import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { camera } from "../scene/components/camera.js";
import { noParticipants } from "../scene/settings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.avatarLookAt = avatarLookAt
export default function avatarLookAt(who, toWhom, duration) {

	if ( who === 0 ) {
		for (let i=1; i<noParticipants; i++) {
			participants[i].model.traverse(function(object) {
				if (object.isMesh) {
					if (i !== toWhom) {
						object.material.color = {
							r: 1,
							g: 1,
							b: 1,
							isColor: true
						}
					} else {
						object.material.color = {
							r: 1.5,
							g: 1.5,
							b: 1.5,
							isColor: true
						}
						new TWEEN.Tween(object.material.color).to({
							r: 1,
							g: 1,
							b: 1,
							isColor: true
						}, 1000).start()
					}
				}
			});
		}
	}

	let direction = new THREE.Vector3();
	let focalPoint;

	if (toWhom === 0) {
		focalPoint = camera.getWorldPosition(direction)
	} else {
		focalPoint = participants[toWhom].movableBodyParts.head.getWorldPosition(direction)
	}

	if (toWhom !== who) {
		if ( who === 0 ) {
			let cameraTweenRotation = new TWEEN.Tween(camera.rotation).to(me.rotations[toWhom], duration)
				.easing(TWEEN.Easing.Quintic.Out)
			let cameraTweenPosition = new TWEEN.Tween(camera.position).to({x: -0.2*participants[toWhom].rotations[0].head.y}, duration)
				.easing(TWEEN.Easing.Quintic.Out)
			cameraTweenRotation.start()
			cameraTweenPosition.start()
		} else {
			let head = new TWEEN.Tween(participants[who].movableBodyParts.head.rotation).to(participants[who].rotations[toWhom].head, 0.8*duration)
			let spine2 = new TWEEN.Tween(participants[who].movableBodyParts.spine2.rotation).to(participants[who].rotations[toWhom].spine2, 0.9*duration)
			let spine1 = new TWEEN.Tween(participants[who].movableBodyParts.spine1.rotation).to(participants[who].rotations[toWhom].spine1, duration)
			head.easing(TWEEN.Easing.Quintic.Out)
			spine2.easing(TWEEN.Easing.Quintic.Out)
			spine1.easing(TWEEN.Easing.Quintic.Out)
			head.start();
			spine2.start();
			spine1.start();
			participants[who].states.currentlyLookingAt = toWhom
			//participants[who].tweens.blink()

			head.onUpdate(function (object) {
				participants[who].movableBodyParts.leftEye.lookAt(focalPoint)
				participants[who].movableBodyParts.rightEye.lookAt(focalPoint)
			})
		}
	}
}
