import { participants } from "../../models/components/avatar.js"
import { posRot } from "../../scene/components/pos-rot.js"
import { noP, camera } from "../../scene/components/camera.js";
import easingDict from "../easings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

const expressionMorphs = {
	"sad": {
		//"browInnerUp": 0.25,
		"browOuterUpLeft": -0.25,
		"browOuterUpRight": -0.25,
		"eyesLookDown": 0.25,
		"cheekSquintLeft": -0.25,
		"cheekSquintRight": -0.25,
		"mouthRollLower": 0.5,
		"mouthRollUpper": 0.25,
		"mouthFrownLeft": 1,
		"mouthFrownRight": 1,
		"mouthSmileLeft": -0.15,
		"mouthSmileRight": -0.15,
		"mouthPressRight": -0.15,
		"mouthPressLeft": -0.15,
		"mouthLowerDownLeft": 0.25,
		"mouthLowerDownRight": 0.25,
		"mouthDimpleLeft": -0.15,
		"mouthDimpleRight": -0.15,
		"jawForward": 0.5,
	},
	"smile": {
		"cheekSquintLeft": 0.5,
		"cheekSquintRight": 0.5,
		"mouthDimpleLeft": 0.5,
		"mouthDimpleRight": 0.5,
		"mouthSmileLeft": 0.5,
		"mouthSmileRight": 0.5,
		"mouthRollLower": 0.25,
		"mouthRollUpper": -0.25,
	},
	"bigSmile": {
		"cheekSquintLeft": 0.75,
		"cheekSquintRight": 0.75,
		"mouthDimpleLeft": 0.5,
		"mouthDimpleRight": 0.5,
		"mouthSmileLeft": 0.5,
		"mouthSmileRight": 0.5,
		"mouthRollUpper": -0.5,
		"mouthRollLower": 0.5,
		"browInnerUp": 0.2,
		"browOuterUpLeft": 0.2,
		"browOuterUpRight": 0.2,
		"mouthOpen": 0.5,
		"eyeWideLeft": 0.25,
		"eyeWideRight": 0.25,
		"jawOpen": 0.5,
	},
	'surprise': {
		"cheekSquintLeft": -0.5,
		"cheekSquintRight": -0.5,
		"browInnerUp": 1,
		"browOuterUpLeft": 1,
		"browOuterUpRight": 1,
		"eyeWideLeft": 0.5,
		"eyeWideRight": 0.5,
		"mouthShrugLower": 0.5,
		"jawOpen": 1,
	}
}

export default function prepareExpressions() {

	for(let i=1; i<noP; i++) {
		Object.entries(expressionMorphs).forEach( function(e) {
			let lengthArray = participants[i].movableBodyParts.face.morphTargetInfluences.length
			participants[i].movableBodyParts.face.morphTargetDictionary[e[0]] = lengthArray
			Object.entries(e[1]).forEach( function(m, ind) {
				let morphId = participants[i].movableBodyParts.face.morphTargetDictionary[m[0]]
				let copyPosition = participants[i].movableBodyParts.face.geometry.morphAttributes.position[morphId].array.map(function(n) {
					return n * m[1]
				}) 
				let copyNormal = participants[i].movableBodyParts.face.geometry.morphAttributes.normal[morphId].array.map(function(o) {
					return o * m[1]
				}) 

				if (ind===0) {
					const newMorphTargetPosition = new THREE.Float32BufferAttribute( copyPosition, 3 );
					const newMorphTargetNormal = new THREE.Float32BufferAttribute( copyNormal, 3 );
					participants[i].movableBodyParts.face.geometry.morphAttributes.position = [...participants[i].movableBodyParts.face.geometry.morphAttributes.position, newMorphTargetPosition]
					participants[i].movableBodyParts.face.geometry.morphAttributes.normal = [...participants[i].movableBodyParts.face.geometry.morphAttributes.normal, newMorphTargetNormal]
					participants[i].movableBodyParts.face.morphTargetInfluences = [...participants[i].movableBodyParts.face.morphTargetInfluences, 0]
				} else {
					participants[i].movableBodyParts.face.geometry.morphAttributes.position[lengthArray].array = participants[i].movableBodyParts.face.geometry.morphAttributes.position[lengthArray].array.map(function(num, idx) {
						return num + copyPosition[idx]
					}) 
					participants[i].movableBodyParts.face.geometry.morphAttributes.normal[lengthArray].array = participants[i].movableBodyParts.face.geometry.morphAttributes.normal[lengthArray].array.map(function(num, idx) {
						return num + copyNormal[idx]
					}) 
				}
			})
		})
		participants[i].blankFaceMorphTargets = Object.assign({}, participants[i].movableBodyParts.face.morphTargetInfluences);
	}
}

export {expressionMorphs}
