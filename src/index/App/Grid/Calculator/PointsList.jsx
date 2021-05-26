import "./PointsList/PointsList.css";

function PointsList({ points, setPoints }) {
	const removePoint = index => {
		setPoints(prev => {
			let ret = [...prev];
			ret.splice(index, 1);
			return ret;
		});
	};

	const hightlightPoint = (index, set) => {
		setPoints(prev => {
			let ret = [...prev];
			ret[index].hover = set;
			return ret;
		});
	};

	return (
		<div className="max-sized">
			<ol>
				{points.length > 0 ? (
					points.map((point, index) => (
						<li
							xs="12"
							key={index}
							onClick={() => removePoint(index)}
							onMouseEnter={() => hightlightPoint(index, true)}
							onMouseLeave={() => hightlightPoint(index, false)}>
							({point.x}, {point.y})
						</li>
					))
				) : (
					<p>
						No points supplied. Click the map on the left to start
						adding points.
					</p>
				)}
			</ol>
		</div>
	);
}

export default PointsList;
