import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { noP, camera } from "../scene/components/camera.js";
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.avatarNodShake = avatarNodShake
export default function avatarNodShake(who, nodShake) {

	let curHeadRotX = participants[who].movableBodyParts.head.rotation.x
	let curHeadRotY = participants[who].movableBodyParts.head.rotation.y
	let initialRotation
	let midRotation
	let endRotation
	let startTime
	let midTime
	let finishTime
	if (nodShake === "shake") {
		initialRotation = {y:curHeadRotY+0.25}
		midRotation = {y:curHeadRotY-0.25}
		endRotation = {y:curHeadRotY}
		startTime = 300
		midTime = 550
		finishTime = 400
	} else {
		initialRotation = {x:curHeadRotX-0.05}
		midRotation = {x:curHeadRotX+0.2}
		endRotation = {x:curHeadRotX}
		startTime = 200
		midTime = 350
		finishTime = 250
	}
	let start = new TWEEN.Tween(participants[who].movableBodyParts.head.rotation).to(initialRotation, startTime)
		.easing(TWEEN.Easing.Quadratic.Out)
	let mid = new TWEEN.Tween(participants[who].movableBodyParts.head.rotation).to(midRotation, midTime)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.repeat(3)
		.yoyo(true)
	let finish = new TWEEN.Tween(participants[who].movableBodyParts.head.rotation).to(endRotation, midTime)
		.easing(TWEEN.Easing.Quadratic.InOut)
	
	start.chain(mid)
	mid.chain(finish)
	start.start();

	let direction = new THREE.Vector3();
	let focalPoint;
	if (participants[who].states.currentlyLookingAt === 0) {
		focalPoint = camera.getWorldPosition(direction)
	} else {
		focalPoint = participants[participants[who].states.currentlyLookingAt].movableBodyParts.head.getWorldPosition(direction)
	}
	start.onUpdate(function (object) {
		participants[who].movableBodyParts.leftEye.lookAt(focalPoint)
		participants[who].movableBodyParts.rightEye.lookAt(focalPoint)
	})
	mid.onUpdate(function (object) {
		participants[who].movableBodyParts.leftEye.lookAt(focalPoint)
		participants[who].movableBodyParts.rightEye.lookAt(focalPoint)
	})
	finish.onUpdate(function (object) {
		participants[who].movableBodyParts.leftEye.lookAt(focalPoint)
		participants[who].movableBodyParts.rightEye.lookAt(focalPoint)
	})
}
