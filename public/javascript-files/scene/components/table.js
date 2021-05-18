import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { noParticipants, cameraSettings } from "../settings.js"
import { group } from "../load-scene.js"

export default function addTable() {
	let table = includeTable(cameraSettings[noParticipants].radius, 32, 0)
	group.add( table );
}

function includeTable( rad, sides, zRot ) {
  const geometry = new THREE.CircleGeometry(rad-0.15, 32);
	const material = new THREE.MeshBasicMaterial( { color: 0xaa0a0a } );
	const table = new THREE.Mesh( geometry, material );
	table.rotation.set(-Math.PI/2, 0, 0)
	table.position.set(0, 1, 0)
	return table
}
