import { useCallback, useEffect, useRef } from "react";

import "./Canvas/Canvas.css";
import scalePoint from "../shared/scalePoint";

const drawPaths = (ctx, points, canvasWidth, canvasHeight, size, color) => {
	ctx.lineWidth = size;
	ctx.strokeStyle = color;

	const start = scalePoint(points[0], canvasWidth, canvasHeight);

	ctx.beginPath();
	ctx.moveTo(start.x, start.y);

	for (let i = 1; i < points.length; i++) {
		const point = scalePoint(points[i], canvasWidth, canvasHeight);
		ctx.lineTo(point.x, point.y);
	}

	ctx.stroke();
};

const drawPoints = (
	ctx,
	points,
	canvasWidth,
	canvasHeight,
	size,
	color,
	altColor
) => {
	for (let i = 0; i < points.length; i++) {
		ctx.fillStyle = points[i].hover ? altColor : color;

		const point = scalePoint(points[i], canvasWidth, canvasHeight);
		ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
	}
};

const Canvas = ({ points = [], width, height }) => {
	const canvasRef = useRef(null);

	const draw = useCallback(
		ctx => {
			ctx.clearRect(0, 0, width, height);

			if (points.length > 0) {
				// Outline path
				drawPaths(ctx, points, width, height, 5, "black");
				// Main path
				drawPaths(ctx, points, width, height, 3, "white");

				// Outline points
				drawPoints(ctx, points, width, height, 10, "black", "white");
				// Main points
				drawPoints(ctx, points, width, height, 8, "white", "red");
			}
		},
		[points, width, height]
	);

	useEffect(() => {
		const ctx = canvasRef.current.getContext("2d");
		draw(ctx);
	}, [canvasRef, draw]);

	return (
		<canvas
			ref={canvasRef}
			className="overlay"
			width={width}
			height={height}
		/>
	);
};

export default Canvas;
