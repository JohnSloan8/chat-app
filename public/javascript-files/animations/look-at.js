import { participants } from "../models/components/avatar.js"
import { posRot } from "../scene/components/pos-rot.js"
import { noP } from "../scene/components/camera.js";

window.lookAt = lookAt;
export default function lookAt(a, b, speed) {
	let angle = getAngle(a, b)
	console.log('angle:', angle)
	let leftOrRight = (angle > 0) ? "look-left" : "look-right"
	console.log('leftOrRight:', leftOrRight)
	let amount = (angle / (Math.PI/2))
	console.log('amoun:', amount)
	let action = getActionFromName(leftOrRight, a);
	resetAllActionWeights(a)	
	setWeight(action, amount);
	action.play();
}

function getAngle(a, b) {
	return posRot[noP][a].rotations[b] - posRot[noP][a].rotations[a]
}

function resetAllActionWeights(pNo) {
	participants[pNo]['allActions'].forEach( function(part) {
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

function setWeight(action, weight) {
	action.enabled = true;
	action.setEffectiveTimeScale(1);
	action.setEffectiveWeight(weight);
}
