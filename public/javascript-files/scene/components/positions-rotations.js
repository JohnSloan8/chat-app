//var posRot = {
	//2: {
		//cornerCentreDist: 0.5/Math.sin(Math.PI/3),
		//tableRot: -Math.PI/6,
		//0: {
			//x: 0,
			//z: 0.5,
			//fov: 45,
		//},
		//1: {
			//x: 0, 
			//z: -0.5,
			//rotations: [ 0, 0 ] 
		//}
	//},
	//3: {
		//cornerCentreDist: Math.sqrt(2*0.5**2),
		//tableRot: Math.PI/4,
		//0: {
			//x: 0,
			//z: 0.5,
			//fov: 50,
		//},
		//1: {
			//x: -0.5, 
			//z: -0.5,
			//rotations: [ Math.atan(0.5), Math.PI/4, Math.PI/2 ] 
		//},
		//2: {
			//x: 0.5, 
			//z: -0.5,
			//rotations: [ -Math.atan(0.5), Math.PI/2, Math.PI/4 ] 
		//}
	//},
	//4: {
		//cornerCentreDist: 1/(2*(Math.sin(Math.PI/5))),
		//tableRot: Math.sin(Math.PI/10),
		//0: {
			//x: 0,
			//z: 0.5/Math.tan(Math.PI/5),
			//fov: 65,
		//},
		//1: {
			//x: -Math.cos(Math.PI/10)/(2*(Math.sin(Math.PI/5))), 
			//z: -Math.sin(Math.PI/10)/(2*(Math.sin(Math.PI/5))),
			//rotations: [Math.atan((0.5+Math.sin(Math.PI/10))/Math.cos(Math.PI/10)), (2/5)*Math.PI, (7/10)*Math.PI, Math.PI/2] 
		//},
		//2: {
			//x: 0, 
			//z: -1/(2*Math.sin(Math.PI/5)),
			//rotations: [0, -(3/10)*Math.PI, 0, (3/10)*Math.PI] 
		//},
		//3: {
			//x: Math.cos(Math.PI/10)/(2*(Math.sin(Math.PI/5))), 
			//z: -Math.sin(Math.PI/10)/(2*(Math.sin(Math.PI/5))),
			//rotations: [-Math.atan((0.5+Math.sin(Math.PI/10))/Math.cos(Math.PI/10)), -Math.PI/2, -(7/10)*Math.PI, -(2/5)*Math.PI] 
		//}
	//},
	//5: {
		//cornerCentreDist: 1,
		//tableRot: 0,
		//0: {
			//x: 0,
			//z: Math.cos(Math.PI/6),
			//fov: 55,
		//},
		//1: {
			//x: -1, 
			//z: 0,
			//rotations: [Math.atan(1/(Math.cos(Math.PI/6))), Math.PI/2, 5*Math.PI/6, 4*Math.PI/6, Math.PI/2] 
		//},
		//2: {
			//x: -0.5, 
			//z: -Math.cos(Math.PI/6),
			//rotations: [Math.atan(0.5/(2*Math.cos(Math.PI/6))), -Math.PI/6, Math.PI/6, Math.PI/2, Math.PI/3] 
		//},
		//3: {
			//x: 0.5, 
			//z:- Math.cos(Math.PI/6),
			//rotations: [-Math.atan(0.5/(2*Math.cos(Math.PI/6))), -Math.PI/3, -Math.PI/2, -Math.PI/6, Math.PI/6] 
		//},
		//4: {
			//x: 1, 
			//z: 0,
			//rotations: [-Math.atan(1/(Math.cos(Math.PI/6))), -Math.PI/2, -4*Math.PI/6, -5*Math.PI/6, -Math.PI/2] 
		//},
	//}		
//}

//export default function CalculatePositionsRotations( numberOfParticipants, socialDistance ) {
	//let positions = false;
	//let rotations = false;
	//let cameraPos = 0.5;
	//let cameraFov = 40;
	////calculateMirrorPosRot( numberOfParticipants )
	//if ( numberOfParticipants === 2 ) {
		//positions = [[0, -0.5]]
		//rotations = [0]
	//} else if ( numberOfParticipants === 3 ) {
		//positions = [[-0.5, -0.5], [0.5, -0.5]]
		//rotations = [Math.PI/4, -Math.PI/4]
	//} else if ( numberOfParticipants === 4 ) {
		//positions = [[posRot[4][1].x, posRot[4][1].z], [posRot[4][2].x, posRot[4][2].z], [posRot[4][3].x, posRot[4][3].z]]
		//let w = 0;
		//rotations = [posRot[4][1].rotations[w], posRot[4][2].rotations[w], posRot[4][3].rotations[w]]
		//cameraPos = posRot[4][0].z
		//cameraFov = posRot[4][0].fov

	////} else if ( numberOfParticipants === 3 ) {
		////let pos3 = Math.cos(Math.PI/6) / 2
		////positionsRotations = [[-0.5, -pos3, Math.atan( 0.5 / pos3 ) ], [0.5, -pos3, -Math.atan( 0.5 / pos3 )]]
		////rotations = [0]
		////cameraPos = 0.5
		////cameraFov = 45
	////} else if ( numberOfParticipants === 4 ) {
		////positionsRotations = [[-0.5, 0, Math.PI/2], [0, -0.5, 0], [0.5, 0, -Math.PI/2]]
		////rotations = [0]
		////cameraPos = 0.5
		////cameraFov = 45
	////} else if ( numberOfParticipants === 5 ) {
		////let pos5a = Math.sin(Math.PI / 10) / (2 * Math.sin(Math.PI / 5 ))
		////let pos5b = 1 / (2 * Math.sin(Math.PI/5))
		////let pos5c = Math.cos(Math.PI/5)
		////let rot5a = Math.atan(pos5b/0.5)
		////positionsRotations = [[-pos5c, pos5a, 3*Math.PI/5], [-0.5, -pos5b, Math.PI / 2 - rot5a], [0.5, -pos5b, -(Math.PI / 2 - rot5a)], [pos5c, pos5a, -3*Math.PI/5]]
		////rotations = [0]
		////cameraPos = 0.5
		////cameraFov = 45
	//}
	//cameraPos *= socialDistance
	//let sociallyDistantPositions = [];
	//positions.forEach( function(p) {
		//sociallyDistantPositions.push(p.map( x => x * socialDistance ))
	//})
	//console.log('socialDistance:', socialDistance)
	//console.log('positions:', positions)
	//return [sociallyDistantPositions, rotations, cameraPos, cameraFov]
//}

//function CalculateCameraPosition( numberOfParticipants ) {
	//let positions = [ null, null, 0.5, Math.cos(Math.PI/6)/2, 0.5, 1/(2*Math.sin(Math.PI/5))]
	//return positions[ numberOfParticipants ]
//}

//export { CalculateCameraPosition }
//export { posRot }
