import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";

function addCentralColumn() {
  const geometry = new THREE.BoxGeometry(0.1, 10, 0.1);
	const material = new THREE.MeshBasicMaterial( { color: 0xaa0a0a } );
	const  = new THREE.Mesh( geometry, material );
	table.rotation.set(-Math.PI/2, 0, 0)
	table.position.set(0, 1, 0)
	return table
}
