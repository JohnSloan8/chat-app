export default function CalculatePositionsRotations( numberOfParticipants, socialDistance ) {
	let positions = false;
	let rotations = false;
	let cameraPos = false;
	let cameraFov = false;
	if ( numberOfParticipants === 2 ) {
		positions = [[0, -0.5]]
		rotations = [0]
		cameraPos = 0.5
		cameraFov = 45
	} else if ( numberOfParticipants === 3 ) {
		positions = [[-0.5, -0.5], [0.5, -0.5]]
		rotations = [Math.PI/4, -Math.PI/4]
		cameraPos = 0.5
		cameraFov = 45
	} else if ( numberOfParticipants === 4 ) {
		let pos5a = Math.sin(Math.PI / 10) / (2 * Math.sin(Math.PI / 5 ))
		let pos5b = 1 / (2 * Math.sin(Math.PI/5))
		let pos5c = Math.cos(Math.PI/5)
		let rot5a = Math.atan(pos5b/0.5)
		positionsRotations = [[-0.5, -pos5b], [0.5, -pos5b], [pos5c, pos5a]]
		rotations = [Math.PI/2 - rot5a,-(Math.PI / 2 - rot5a), -3*Math.PI/5]
		cameraPos = 0.5
		cameraFov = 45

	//} else if ( numberOfParticipants === 3 ) {
		//let pos3 = Math.cos(Math.PI/6) / 2
		//positionsRotations = [[-0.5, -pos3, Math.atan( 0.5 / pos3 ) ], [0.5, -pos3, -Math.atan( 0.5 / pos3 )]]
		//rotations = [0]
		//cameraPos = 0.5
		//cameraFov = 45
	//} else if ( numberOfParticipants === 4 ) {
		//positionsRotations = [[-0.5, 0, Math.PI/2], [0, -0.5, 0], [0.5, 0, -Math.PI/2]]
		//rotations = [0]
		//cameraPos = 0.5
		//cameraFov = 45
	//} else if ( numberOfParticipants === 5 ) {
		//let pos5a = Math.sin(Math.PI / 10) / (2 * Math.sin(Math.PI / 5 ))
		//let pos5b = 1 / (2 * Math.sin(Math.PI/5))
		//let pos5c = Math.cos(Math.PI/5)
		//let rot5a = Math.atan(pos5b/0.5)
		//positionsRotations = [[-pos5c, pos5a, 3*Math.PI/5], [-0.5, -pos5b, Math.PI / 2 - rot5a], [0.5, -pos5b, -(Math.PI / 2 - rot5a)], [pos5c, pos5a, -3*Math.PI/5]]
		//rotations = [0]
		//cameraPos = 0.5
		//cameraFov = 45
	}
	cameraPos *= socialDistance
	let sociallyDistantPositions = [];
	positions.forEach( function(p) {
		sociallyDistantPositions.push(p.map( x => x * socialDistance ))
	})
	console.log('socialDistance:', socialDistance)
	console.log('positions:', positions)
	return [sociallyDistantPositions, rotations, cameraPos, cameraFov]
}

//function CalculateCameraPosition( numberOfParticipants ) {
	//let positions = [ null, null, 0.5, Math.cos(Math.PI/6)/2, 0.5, 1/(2*Math.sin(Math.PI/5))]
	//return positions[ numberOfParticipants ]
//}

//export { CalculateCameraPosition }
