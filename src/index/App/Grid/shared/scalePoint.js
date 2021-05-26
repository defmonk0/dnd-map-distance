function scalePoint(point, width, height) {
	let x = point.x;
	let y = point.y;

	x *= width / point.width;
	y *= height / point.height;

	return { x, y };
}

export default scalePoint;
