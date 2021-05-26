import { useMemo, useState } from "react";

import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";

import scalePoint from "../shared/scalePoint";

function epsRound(n) {
	return Math.round((n + Number.EPSILON) * 100) / 100;
}

function TravelStats({ points, inScale, disScale }) {
	const [traveled, setTraveled] = useState(0);

	const distance = useMemo(() => {
		let total = 0;
		let x2, x1, y2, y1;
		x2 = x1 = y2 = y1 = null;

		for (const point of points) {
			x1 = x2;
			y1 = y2;

			const scaled = scalePoint(
				point,
				point.naturalWidth,
				point.naturalHeight
			);

			x2 = scaled.x;
			y2 = scaled.y;

			if (x1 !== null && x2 !== null && y1 !== null && y2 !== null) {
				const x = x2 - x1;
				const y = y2 - y1;
				const d = Math.sqrt(x * x + y * y);

				total += (d / inScale) * disScale;
			}
		}

		return epsRound(total);
	}, [points, inScale, disScale]);

	return (
		<>
			<Row className="mb-3">
				<Col xs="6">
					<h3>Total Distance</h3>
				</Col>
				<Col xs="6">
					<h3>{distance} Miles</h3>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col xs="6">
					<h4>Distance Traveled</h4>
				</Col>
				<Col xs="6">
					<FormControl
						type="number"
						value={traveled}
						onChange={e => setTraveled(e.target.value)}
					/>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col xs="6">
					<h5>Fast Pace</h5>
				</Col>
				<Col xs="6">
					<h5>{epsRound(distance / 4)} hours of travel</h5>
					<span className="text-black-50">
						{epsRound(distance / 4 - traveled)} hours of travel
						remain
					</span>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col xs="6">
					<h5>Normal Pace</h5>
				</Col>
				<Col xs="6">
					<h5>{epsRound(distance / 3)} hours of travel</h5>
					<span className="text-black-50">
						{epsRound(distance / 3 - traveled)} hours of travel
						remain
					</span>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col xs="6">
					<h5>Slow Pace</h5>
				</Col>
				<Col xs="6">
					<h5>{epsRound(distance / 2)} hours of travel</h5>
					<span className="text-black-50">
						{epsRound(distance / 2 - traveled)} hours of travel
						remain
					</span>
				</Col>
			</Row>
		</>
	);
}

export default TravelStats;
