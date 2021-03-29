import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";

export default function includeTable( rad, sides, zRot ) {
	// add central pillar
  const geometry = new THREE.CircleGeometry(rad, 32);
	const material = new THREE.MeshBasicMaterial( { color: 0xaa0a0a } );
	const table = new THREE.Mesh( geometry, material );
	table.rotation.set(-Math.PI/2, 0, 0)
	table.position.set(0, 1, 0)

	return table
}
