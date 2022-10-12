import { useCallback, useRef } from "react";

import Image from "react-bootstrap/Image";

import Canvas from "./Map/Canvas";
import useDimension from "./Map/useDimension";
import map from "./Map/map.jpg";

import "./Map/Map.css";

function Map({ points, setPoints, userMap }) {
	const imageRef = useRef(null);
	const sizes = useDimension(imageRef);

	const addPoint = useCallback(
		e => {
			setPoints(prev => {
				return [
					...prev,
					{
						x: e.nativeEvent.layerX,
						y: e.nativeEvent.layerY,
						width: e.target.width,
						height: e.target.height,
						naturalWidth: e.target.naturalWidth,
						naturalHeight: e.target.naturalHeight,
						hover: false,
					},
				];
			});
		},
		[setPoints]
	);

	return (
		<div className="position-relative">
			<Canvas points={points} width={sizes.width} height={sizes.height} />
			<Image
				src={userMap ?? map}
				ref={imageRef}
				className="left-image"
				onMouseDown={addPoint}
			/>
		</div>
	);
}

export default Map;
