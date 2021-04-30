import { participants } from "../../models/components/avatar.js"
import { posRot } from "../../scene/components/pos-rot.js"
import { noP, camera } from "../../scene/components/camera.js";
import easingDict from "../easings.js"
import {expressionMorphs} from "./prepare.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

const jawNeeded = {
	"smile": false,
	"bigSmile": true,
	"surprise": true,
}

window.allExpression = allExpression
function allExpression(e) {
	for (let i=1; i<noP; i++) {
		expression(i, e)
	}
}

window.expression = expression
export default function expression(who, e) {

	let faceMorphsFrom = Object.assign({}, participants[who].blankFaceMorphTargets);
	let faceMorphsHalf = Object.assign({}, participants[who].blankFaceMorphTargets);
	let faceMorphsTo = Object.assign({}, participants[who].blankFaceMorphTargets);
	faceMorphsTo[participants[who].movableBodyParts.face.morphTargetDictionary[e]] = 1
	faceMorphsHalf[participants[who].movableBodyParts.face.morphTargetDictionary[e]] = 1/2
	console.log('faceMorphsTo:', faceMorphsTo)

	let expressionIn = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(faceMorphsTo, 500)
		.easing(easingDict["cubicOut"])

	let expressionOut = new TWEEN.Tween(participants[who].movableBodyParts.face.morphTargetInfluences).to(faceMorphsHalf, 1500)
		.easing(easingDict["cubicOut"])
		.delay(3000)
	
	expressionIn.chain(expressionOut)
	expressionIn.start()

	if ( jawNeeded[e] ) {
		expressionIn.onStart( function() {
			new TWEEN.Tween(participants[who].movableBodyParts.teeth.morphTargetInfluences).to({"45": expressionMorphs[e].jawOpen}, 500)
			.easing(easingDict["cubicOut"])
			.start()
		})
		expressionOut.onStart( function() {
			new TWEEN.Tween(participants[who].movableBodyParts.teeth.morphTargetInfluences).to({"45": expressionMorphs[e].jawOpen/3}, 1500)
			.easing(easingDict["cubicOut"])
			.start()
		})
	}
}

