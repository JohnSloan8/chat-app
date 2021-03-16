import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import { scene } from "./scene.js";

let plane;

export default function setupBackground() {
	scene.background = new THREE.Color(0x87ceeb);
	scene.fog = new THREE.Fog(0x87ceeb, 3.5, 5.0);

	plane = new THREE.Mesh(
		new THREE.PlaneGeometry(10, 10, 10, 10),
		new THREE.MeshPhongMaterial({
			color: 0x1b3f01,
			depthWrite: false,
		})
	);
	plane.castShadow = false;
	plane.receiveShadow = true;
	plane.rotation.x = -Math.PI / 2;
	scene.add(plane);
}
