import { posRot } from "../../scene/components/pos-rot.js"
import { camera } from "../../scene/components/camera.js";
import { cameraSettings } from "../settings.js"
import easingDict from "../../animations/easings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'
import { noParticipants } from "../settings.js"

window.cameraEnter = cameraEnter
export default function cameraEnter(amount=0.7, duration=2000, easing="cubicOut") {
	let direction = new THREE.Vector3();
	let headPos = participants[0].movableBodyParts.head.getWorldPosition(direction)
	//let cameraEnterTween = new TWEEN.Tween(camera.position).to({x: headPos.x, y: headPos.y+0.1, z: headPos.z+0.2}, duration)
	let cameraEnterTween = new TWEEN.Tween(camera.position).to({x: headPos.x, y: headPos.y+0.1, z: headPos.z}, duration)
	.easing(easingDict[easing])
	.start()

	cameraEnterTween.onUpdate( function() {
		camera.lookAt(0, 1.69, 0);
	})

	setTimeout( function(){

	}, )

}
