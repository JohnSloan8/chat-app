import setupBackground from "./components/background.js";
import setupLights from "./components/lights.js";
import setupScene from "./components/scene.js";
import setupCamera from "./components/camera.js";

export default function loadScene() {
	setupScene();
	setupCamera();
	setupBackground();
	setupLights();
}
