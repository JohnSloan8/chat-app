import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { noP } from "../scene/components/camera.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

window.avatarLookAt = avatarLookAt
export default function avatarLookAt(who, toWhom) {

	console.log('TWEEN:', TWEEN)
	//let t = new TWEEN.Tween(participants[1].head.rotation).to({x: participants[1].headRotations[0].x, y: participants[1].headRotations[0].y, z: participants[1].headRotations[0].z})
	let t = new TWEEN.Tween(participants[who].head.rotation).to(participants[who].headRotations[toWhom])
	//let t = new TWEEN.Tween(participants[3].head.rotation).to({x:1, y:1, z:1})
	t.start();
	t.onUpdate(function (object) {
		//console.log(object.x)
	})
}
