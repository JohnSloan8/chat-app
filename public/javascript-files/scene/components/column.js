import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";

export default function includeColumn( x, y, z, c ) {
  const geometry = new THREE.BoxGeometry(x, y, z);
	const material = new THREE.MeshBasicMaterial( { color: c } );
	const centralColumn = new THREE.Mesh( geometry, material );
	return centralColumn
}
