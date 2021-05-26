// FROM: https://medium.datadriveninvestor.com/usedimension-react-hook-dcd0ecaf1160

import { useRef, useState, useEffect } from "react";

const initialState = { width: 0, height: 0 };

//  ref is the reference to the element whose height and with is required
//  const divRef = useRef(null);
//  const { height, width } = useDimension(divRef);
//  <div ref={divRef}>
const useDimension = ref => {
	const [dimensions, setdDimensions] = useState(initialState);
	const resizeObserverRef = useRef(null);

	useEffect(() => {
		resizeObserverRef.current = new ResizeObserver((entries = []) => {
			entries.forEach(entry => {
				const { width, height } = entry.contentRect;
				setdDimensions({ width, height });
			});
		});

		if (ref.current) {
			resizeObserverRef.current.observe(ref.current);
		}

		return () => {
			if (resizeObserverRef.current)
				resizeObserverRef.current.disconnect();
		};
	}, [ref]);
	return dimensions;
};

export default useDimension;
