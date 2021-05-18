import { cameraSettings } from "../settings.js"

var posRot = {}

export default function calculatePosRot(noP) {
	posRot[noP] = {
		camera: {
			x: 0,
			y: cameraSettings.cameraYPos,
			z: cameraSettings[noP].cameraZPos+cameraSettings[noP].radius,
			yFocus: cameraSettings.cameraFocY,
			fov: cameraSettings[noP].cameraFov,
		}
	};

	let curAng = 0;
	if (noP%2 === 0) {
		curAng = (noP - 2)/2 * cameraSettings[noP].angle
	} else {
		curAng = Math.floor((noP/2) - 1) * cameraSettings[noP].angle + cameraSettings[noP].angle/2;
	}
	for (let i=1; i<noP; i++) {
		posRot[noP][i] = {
			x: Math.round(1000 * cameraSettings[noP].radius * Math.sin(-curAng))/1000,
			z: Math.round(1000 * -cameraSettings[noP].radius * Math.cos(curAng))/1000,
			neutralYrotation: curAng
		}
		curAng -= cameraSettings[noP].angle;
	}
	return posRot
}

export { posRot }
