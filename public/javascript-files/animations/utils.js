import { participants } from "../models/components/avatar.js"

window.beginAction = beginAction;
window.getActionFromName = getActionFromName;
var playing

export default function beginAction(actionName, pNo, startTime, finishTime, timeScale) {
	let action = getActionFromName(actionName, pNo);
	resetAllActionWeights(pNo)
	setWeight(action, startTime, finishTime, timeScale);
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

function setWeight(action, startTime, finishTime, timeScale) {
	action.enabled = true;
	//if(timeScale === -1) {
    //action.time = action.getClip().duration;
		//console.log('duration:', action.time)
	//} else {
		action.time = startTime
	//}
	action.setEffectiveTimeScale(timeScale);
	action.setEffectiveWeight(finishTime);
}

