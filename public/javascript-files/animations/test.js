import avatarLookAt from './look.js'
import { noP } from "../scene/components/camera.js";

window.runTestAnimationSequence = runTestAnimationSequence
export default function runTestAnimationSequence() {
	allLookAt(1)
}

function allLookAt(n) {
	for (let i=1; i<noP; i++) {
		avatarLookAt(i, n, 1000)
	}
	n += 1;
	if (n < noP) {
		setTimeout(function(){allLookAt(n)}, 2000)
	} else {
		setTimeout(function(){allLookAt(0)}, 2000)
	}
}
