import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'
import easingDict from "../easings.js"
import { participants } from "../../models/components/avatar.js"
import { noParticipants } from "../../scene/settings.js"

window.beginRandomSwaying = beginRandomSwaying
export default function beginRandomSwaying() {
	for (let par=1; par<noParticipants; par++) {
		randomSway(par);
		randomNeckTurn(par);
	}
}

function randomSway(who, direction=1) {
	console.log('in randomSway')
	let randomDuration = 2000 + Math.random()*5000;
	let randomRotation = Math.random()*0.025 * direction;
	let sway = new TWEEN.Tween(participants[who].movableBodyParts.spine.rotation).to({z: randomRotation}, randomDuration)
		.easing(easingDict["cubicInOut"])
		.start()
	setTimeout(function(){randomSway(who, direction*=-1)}, randomDuration)
}

function randomNeckTurn(who, direction=1) {
	console.log('in randomNeckTurn')
	let randomDuration = 2000 + Math.random()*5000;
	let randomRotation = Math.random()*0.075 * direction;
	let sway = new TWEEN.Tween(participants[who].movableBodyParts.neck.rotation).to({y: randomRotation}, randomDuration)
		.easing(easingDict["cubicInOut"])
		.start()
	setTimeout(function(){randomNeckTurn(who, direction*=-1)}, randomDuration)
}

