import { allActions, mixer, movementController } from "../models/components/avatar.js"
import { setWeight } from "./load-animations.js"
import { getActionFromName } from "./utils.js"

window.runAnimationSequence = runAnimationSequence

export default function runAnimationSequence(allAnims) {

  let animCount = 0;
  let loopCount = 0;
  let a1;
  let a2;
  function checkLoop(e) {
    if ( e.action._loopCount === allAnims[animCount][1] ) {
      mixer.removeEventListener('loop', checkLoop)
      a1 = getActionFromName(allAnims[animCount][0])
      animCount += 1
      if ( animCount < allAnims.length ) {
      	a2 = getActionFromName(allAnims[animCount][0]);
        a1.reset()
      	a2.reset()
     	 	setWeight(a2, 1)
      	a2.play()
      	a1.crossFadeTo(a2, 1, true)
        mixer.addEventListener('loop', checkLoop);
      }
    }
  }

  if (animCount === 0) {
    a1 = getActionFromName('stand')
    console.log('allAm..:', allAnims[0][0])
		a2 = getActionFromName(allAnims[0][0])
    a1.reset()
    a2.reset()
    setWeight(a2, 1)
    console.log('a2:', a2)
    a2.play()
    a1.crossFadeTo(a2, 0.4, true)
    mixer.addEventListener('loop', checkLoop)
  }
}


