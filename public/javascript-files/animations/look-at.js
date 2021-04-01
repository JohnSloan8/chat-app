import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { noP } from "../scene/components/camera.js";

window.lookAt = lookAt;
export default function lookAt(a, b, speed) {
	let angle = getAngle(a, b)
	let lookAction = (angle > 0) ? 'look-left' : 'look-right'
	let amount = Math.abs(angle/Math.PI)
	if (amount !== 0 ) {
		let startTime = (participants[a]['currentAngle'] - participants[a]['startAngle'])/Math.PI
		if (angle<0){
			startTime = 1-startTime
		}
		participants[a]['currentAngle'] += angle
		console.log('angle:', angle)
		console.log('lookAction:', lookAction)
		console.log('amount:', amount)
		console.log('startTime:', startTime)
		let action = getActionFromName(lookAction, a);
		resetAllActionWeights(a)	
		setWeight(action, startTime, amount, speed);
		action.play();
	}
}

function getAngle(a, b) {
	return posRot[noP][a].rotations[b] - participants[a].currentAngle
}

function resetAllActionWeights(pNo) {
	participants[pNo]['allActions'].forEach( function(part) {
		part.reset();
		part.setEffectiveWeight(0)
	})
	return
}

function getActionFromName(actionName, pNo) {
	let action_ =  participants[pNo]['allActions'].find(obj => {
		return obj._clip.name === actionName
	})
	return action_
} 

function setWeight(action, startTime, amount, speed) {
	action.enabled = true;
	action.setEffectiveTimeScale(speed);
  action.time = startTime;
	action.setEffectiveWeight(amount);
}
