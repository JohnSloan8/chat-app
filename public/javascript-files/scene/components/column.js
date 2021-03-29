import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";

export default function includeColumn( rad, sides, zRot ) {
  const geometry = new THREE.BoxGeometry(0.01, 10, 0.01);
	const material = new THREE.MeshBasicMaterial( { color: 0xaaaa11 } );
	const centralColumn = new THREE.Mesh( geometry, material );
	return centralColumn
}
