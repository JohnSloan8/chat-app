import { setupSettings } from "./camera.js"

var posRot = {}
window.posRot = posRot;

export default function calculatePosRot(noP) {
	posRot[noP] = {
		camera: {
			x: 0,
			y: setupSettings.cameraYPos,
			z: setupSettings[noP].cameraZPos+setupSettings[noP].radius,
			yFocus: setupSettings.cameraFocY,
			fov: setupSettings[noP].cameraFov,
		}
	};

	let curAng = 0;
	if (noP%2 === 0) {
		curAng = (noP - 2)/2 * setupSettings[noP].angle
	} else {
		curAng = Math.floor((noP/2) - 1) * setupSettings[noP].angle + setupSettings[noP].angle/2;
	}
	for (let i=1; i<noP; i++) {
		posRot[noP][i] = {
			x: Math.round(1000 * setupSettings[noP].radius * Math.sin(-curAng))/1000,
			z: Math.round(1000 * -setupSettings[noP].radius * Math.cos(curAng))/1000,
			neutralYrotation: curAng
		}
		curAng -= setupSettings[noP].angle;
	}
	//let xDiff;
	//let zDiff;
	//for (let j=1; j<noP; j++) {
		//for (let k=0; k<noP; k++) {
			//if (k === 0) {
				//xDiff = posRot[noP]['camera'].x - posRot[noP][j].x 
				//zDiff = posRot[noP]['camera'].z - posRot[noP][j].z 
			//} else {
				//xDiff = posRot[noP][k].x - posRot[noP][j].x 
				//zDiff = posRot[noP][k].z - posRot[noP][j].z 
			//}	

			////console.log('xDiff:', xDiff)
			////console.log('zDiff:', zDiff)
			//let rot
			//if (xDiff === 0 && zDiff === 0 ) {
				//rot = Math.atan(posRot[noP][j].x/posRot[noP][j].z)
				//if (posRot[noP][j].z > 0) {
					//rot += Math.PI
				//}
			//} else if (xDiff === 0) {
				//rot = Math.PI
				//if (zDiff > 0) {
					//rot = 0
				//}
			//} else if (zDiff === 0) {
				//rot = Math.PI/2
				//if (xDiff < 0) {
					//rot = -Math.PI/2
				//}
			//} else {
				//rot = Math.atan(xDiff/zDiff)
			//}

			//if ( zDiff < 0 && xDiff !== 0 ) {
				//rot += Math.PI
			//}

			//if (isNaN(rot)) {
			//console.log('j:', j)
			//console.log('k:', k)
				//rot = 0;
			//}
			////console.log('rot:', rot)
			//if ( rot > Math.PI ) {
				//rot -= 2 * Math.PI
			//}
			//posRot[noP][j].rotations.push(rot);
		//}
	//}
	return posRot
}

export { posRot }


				//let x
				//if ([1,0].includes(Math.sign(posRot[noP][j].x)) && Math.sign(posRot[noP][k].x) === -1) {
					//x = -(posRot[noP][j].x + Math.abs(posRot[noP][k].x))
				//} else if ( Math.sign(posRot[noP][j].x) === -1 && [1,0].includes(Math.sign(posRot[noP][k].x))) {
					//x = posRot[noP][j].x - posRot[noP][k].x
				//} else if ( Math.sign(posRot[noP][j].x) === -1 && Math.sign(posRot[noP][k].x) === -1) {
					//x = -(posRot[noP][j].x - posRot[noP][k].x)
				//} else {
					//x = posRot[noP][j].x - posRot[noP][k].x
				//}
				//let z
				//if ( posRot[noP][j].z - posRot[noP][k].z === 0 ){
					//if (posRot[noP][j].x > posRot[noP][k].x) {
						//rot = Math.PI/2;
					//} else {
						//rot = -Math.PI/2;
					//}
				//} else {
					//if ([1,0].includes(Math.sign(posRot[noP][j].z)) && Math.sign(posRot[noP][k].z) === -1) {
						//z = posRot[noP][j].z + Math.abs(posRot[noP][k].z)
					//} else if ( Math.sign(posRot[noP][j].z) === -1 && [1,0].includes(Math.sign(posRot[noP][k].z))) {
						//z = posRot[noP][j].z - posRot[noP][k].z
					//} else if ( Math.sign(posRot[noP][j].z) === -1 && Math.sign(posRot[noP][k].z) === -1) {
						//z = posRot[noP][j].z - posRot[noP][k].z
					//} else {
						//z = posRot[noP][j].z - posRot[noP][k].z
					//}
