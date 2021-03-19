export default function CalculatePositionsRotations( numberOfParticipants ) {
	let positionsRotations = false;
	if ( numberOfParticipants === 2 ) {
		positionsRotations = [[0, -0.5, 0]]
	} else if ( numberOfParticipants === 3 ) {
		let pos3 = Math.cos(Math.PI/6) / 2
		positionsRotations = [[-0.5, -pos3, Math.atan( 0.5 / pos3 ) ], [0.5, -pos3, -Math.atan( 0.5 / pos3 )]]
	} else if ( numberOfParticipants === 4 ) {
		positionsRotations = [[-0.5, 0, Math.PI/2], [0, -0.5, 0], [0.5, 0, -Math.PI/2]]
	} else if ( numberOfParticipants === 5 ) {
		let pos5a = Math.sin(Math.PI / 10) / (2 * Math.sin(Math.PI / 5 ))
		let pos5b = 1 / (2 * Math.sin(Math.PI/5))
		let pos5c = Math.cos(Math.PI/5)
		let rot5a = Math.atan(pos5b/0.5)
		positionsRotations = [[-pos5c, pos5a, 3*Math.PI/5], [-0.5, -pos5b, Math.PI / 2 - rot5a], [0.5, -pos5b, -(Math.PI / 2 - rot5a)], [pos5c, pos5a, -3*Math.PI/5]]
	}
	return positionsRotations
}

function CalculateCameraPosition( numberOfParticipants ) {
	let positions = [ null, null, 0.5, Math.cos(Math.PI/6)/2, 0.5, 1/(2*Math.sin(Math.PI/5))]
	return positions[ numberOfParticipants ]
}

export { CalculateCameraPosition }
