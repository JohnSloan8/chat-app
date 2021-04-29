import { participants } from "../../models/components/avatar.js"
import { posRot } from "../../scene/components/pos-rot.js"
import { noP, camera } from "../../scene/components/camera.js";
import easingDict from "../easings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

const expressionMorphs = {
	"smile": {
		"mouthSmile": 1
	},
	"bigSmile": {
		"mouthOpen": 1,
		"mouthSmile": 1,
		"eyeWideLeft": 0.15,
		"eyeWideRight": 0.15,
		"jawOpen": 0.333,
		"mouthStretchLeft": 1,
		"mouthStretchRight": 1,
		"mouthSmileLeft": 1,
		"mouthSmileRight": 1,
	},
	'surprise': {
		'jaw': true
	}
}

export default function prepareExpressions() {

		//Object.keys(expressionMorphs).forEach( function(m) {
		let copyJawOpenPosition	= participants[2].movableBodyParts.face.geometry.morphAttributes.position[45].array
		const newMorphTargetPosition = new THREE.Float32BufferAttribute( copyJawOpenPosition, 3 );
		let copyJawOpenNormal	= participants[2].movableBodyParts.face.geometry.morphAttributes.normal[45].array
		const newMorphTargetNormal = new THREE.Float32BufferAttribute( copyJawOpenNormal, 3 );

		participants[2].movableBodyParts.face.geometry.morphAttributes.position = [...participants[2].movableBodyParts.face.geometry.morphAttributes.position, newMorphTargetPosition]
		participants[2].movableBodyParts.face.geometry.morphAttributes.normal = [...participants[2].movableBodyParts.face.geometry.morphAttributes.normal, newMorphTargetNormal]
		participants[2].movableBodyParts.face.morphTargetDictionary['surprise'] = 63
		participants[2].movableBodyParts.face.morphTargetInfluences = [...participants[2].movableBodyParts.face.morphTargetInfluences, 0]
		let eyeWideLeftPos = participants[2].movableBodyParts.face.geometry.morphAttributes.position[26].array  
		let eyeWideLeftNor = participants[2].movableBodyParts.face.geometry.morphAttributes.normal[26].array  
		participants[2].movableBodyParts.face.geometry.morphAttributes.position[63].array = participants[2].movableBodyParts.face.geometry.morphAttributes.position[63].array.map(function(num, idx) {
			return num + eyeWideLeftPos[idx]
		}) 
		participants[2].movableBodyParts.face.geometry.morphAttributes.normal[63].array = participants[2].movableBodyParts.face.geometry.morphAttributes.normal[63].array.map(function(num, idx) {
			return num + eyeWideLeftNor[idx]
		}) 
	//})
}

