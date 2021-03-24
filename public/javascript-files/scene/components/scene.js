import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import Stats from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/libs/stats.module.js";
import { camera } from "./camera.js"

let	scene, renderer, clock, container, stats

export default function setupScene() {

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setClearColor( 0xffffff, 0 )
	container = document.getElementById("threeCanvas");
	clock = new THREE.Clock();
	scene = new THREE.Scene();
	stats = new Stats();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;

	container.appendChild(renderer.domElement);
	container.appendChild(stats.dom);

	// add central pillar
  const geometry = new THREE.BoxGeometry(0.01, 10, 0.01);
	const material = new THREE.MeshBasicMaterial( { color: 0xaa0a0a } );
	const centralColumn = new THREE.Mesh( geometry, material );
	scene.add( centralColumn );	

  const geometry1 = new THREE.BoxGeometry(1, 1, 1);
	const material1 = new THREE.MeshBasicMaterial( { color: 0xaa0a0a } );
	const cube = new THREE.Mesh( geometry1, material1 );
	cube.position.set(0,0.5,0)
	scene.add( cube );

	const axesHelper = new THREE.AxesHelper( 5 );
	scene.add( axesHelper );

	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

export { scene, renderer, clock, container, stats }