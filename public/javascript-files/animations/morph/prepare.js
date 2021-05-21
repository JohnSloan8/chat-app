import { participants } from "../../models/components/avatar.js"
import { expressionMorphs } from "./morph-targets.js"
import { posRot } from "../../scene/components/pos-rot.js"
import { camera } from "../../scene/components/camera.js";
import { noParticipants } from "../../scene/settings.js"
import easingDict from "../easings.js"
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js'

export default function prepareExpressions() {

	addHalfAndBlinkExpressions();

	for(let i=1; i<noParticipants; i++) {
		Object.entries(expressionMorphs).forEach( function(e) {
			let lengthArray = participants[i].movableBodyParts.face.morphTargetInfluences.length
			console.log('e:', e)
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
	}
}

function addHalfAndBlinkExpressions() {
	//let partKey = participants[1].movableBodyParts.face.morphTargetDictionary["eyesClosed"]
	Object.entries(expressionMorphs).forEach( function(e) {
		expressionMorphs[e[0]+"Half"] = {}
		for (let key in expressionMorphs[e[0]]) {
			expressionMorphs[e[0]+"Half"][key] = expressionMorphs[e[0]][key]/2
		}
		expressionMorphs[e[0]+"Blink"] = Object.assign({}, expressionMorphs[e[0]])
		expressionMorphs[e[0]+"HalfBlink"] = Object.assign({}, expressionMorphs[e[0]+"Half"])
		expressionMorphs[e[0]+"HalfBlink"]["eyesClosed"] = 0.75

	})
}

export {expressionMorphs}
