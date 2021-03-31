import { participants } from "../models/components/avatar.js"

window.beginAction = beginAction;
window.getActionFromName = getActionFromName;
var playing

export default function beginAction(actionName, pNo, amount, timeScale) {
	let action = getActionFromName(actionName, pNo);
	resetAllActionWeights(pNo)
	setWeight(action, amount, timeScale);
	action.play();
}

function resetAllActionWeights(pNo) {
	participants[pNo]['allActions'].forEach( function(a) {
		a.reset()
		a.setEffectiveWeight(0)
	})
	return
}

function getActionFromName(actionName, pNo) {
	let action_ =  participants[pNo]['allActions'].find(obj => {
		return obj._clip.name === actionName
	})
	return action_
} 

function setWeight(action, weight, timeScale) {
	action.enabled = true;
	if(timeScale === -1) {
    action.time = action.getClip().duration;
  }
	action.setEffectiveTimeScale(timeScale);
	action.setEffectiveWeight(weight);
}

