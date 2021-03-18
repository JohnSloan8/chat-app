import { participants } from "../models/components/avatar.js"
import { setWeight } from "./load-animations.js"

window.beginAction = beginAction;
window.synchronizeCrossFade = synchronizeCrossFade;
window.getActionFromName = getActionFromName;

export default function beginAction(actionName) {
	let action = getActionFromName(actionName);
	resetAllActionWeights()
	setWeight(action, 1);
	action.play();
}

function resetAllActionWeights() {
	allActions.forEach( function(a) {
		a.setEffectiveWeight(0)
	})
	return
}

function getActionFromName(actionName) {
	let action_ =  allActions.find(obj => {
		return obj._clip.name === actionName
	})
	return action_
} 

function synchronizeCrossFade(startAction, endAction, duration) {
	startAction = getActionFromName(startAction)
	endAction = getActionFromName(endAction)
	executeCrossFade(startAction, endAction, duration);	
}

function executeCrossFade(startAction, endAction, duration) {
	// Not only the start action, but also the end action must get a weight of 1 before fading
	// (concerning the start action this is already guaranteed in this place)

	if (endAction) {
		setWeight(endAction, 1);
		endAction.time = 0;
		endAction.play();

		if (startAction) {
			// Crossfade with warping

			startAction.crossFadeTo(endAction, duration, true);
		} else {
			// Fade in

			endAction.fadeIn(duration);
		}
	} else {
		// Fade out

		startAction.fadeOut(duration);
	}
}

/* console code from Fri
beginAction('stand')

function chainEvents(toBeChained) {  

  let currentAction = 'stand';
  let count = 0;
  let noAnimations = toBeChained.length
  mixer.addEventListener( 'loop', onLoopFinished )
  function onLoopFinished(e) {

    console.log( 'e.name:', e.action.getClip().name )
    if ( e.action.getClip().name === currentAction ) {
      synchronizeCrossFade(e.action.getClip().name, toBeChained[count], 0.5)
      mixer.removeEventListener("loop", onLoopFinished)

      if ( count < noAnimations ) {
        currentAction = toBeChained[count]
        count += 1;
        mixer.addEventListener( 'loop', onLoopFinished )
      }
  	}
  }
}
                           
chainEvents(['sub-7', 'stand', 'sub-7', 'ready'])

*/

export { getActionFromName }
