import { useMemo, useState } from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";

import "./TravelStats/TravelStats.css";
import scalePoint from "../shared/scalePoint";
import useLocalStorage from "../../shared/useLocalStorage";

const epsRound = n => {
	return Math.round((n + Number.EPSILON) * 100) / 100;
};

function TravelStats({ points, inScale, disScale }) {
	const [traveled, setTraveled] = useLocalStorage("distance-traveled", 0);
	const [travelSpeed, setTravelSpeed] = useLocalStorage("travel-speed", 0);

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

	const totalTravelHours = epsRound(distance / travelSpeed);
	const totalTravelDays = epsRound(distance / travelSpeed / 8);

	const remainingDistance = distance - traveled;
	const remainingTravelHours = epsRound(remainingDistance / travelSpeed);
	const remainingTravelDays = epsRound(remainingDistance / travelSpeed / 8);

	return (
		<>
			{/* TOTAL TRAVEL */}
			<Row className="mb-3">
				<Col>
					<h4>Total Travel</h4>
				</Col>
				<Col>
					<h4>{distance} Miles</h4>
					<h5 className="text-black-50">{totalTravelHours} Hours</h5>
					<span className="text-black-50">
						{totalTravelDays} Days
					</span>
				</Col>
			</Row>

			{/* TRAVEL SPEED */}
			<Row className="mb-3">
				<Col>
					<h5>Travel Speed (mph)</h5>
				</Col>
				<Col>
					<FormControl
						type="number"
						value={travelSpeed}
						onChange={e => setTravelSpeed(parseInt(e.target.value))}
					/>
					<div>
						<Badge
							className="mr-1 pointer"
							variant="success"
							onClick={() => setTravelSpeed(2)}>
							Slow
						</Badge>
						<Badge
							className="mr-1 pointer"
							variant="warning"
							onClick={() => setTravelSpeed(3)}>
							Normal
						</Badge>
						<Badge
							className="mr-1 pointer"
							variant="danger"
							onClick={() => setTravelSpeed(4)}>
							Fast
						</Badge>
						<Badge
							className="mr-1 pointer"
							variant="info"
							onClick={() => setTravelSpeed(5)}>
							Ship
						</Badge>
					</div>
				</Col>
			</Row>

			{/* PROGRESS */}
			<Row className="mb-3">
				<Col>
					<h5>Progress (mi)</h5>
				</Col>
				<Col>
					<FormControl
						type="number"
						value={traveled}
						onChange={e => setTraveled(e.target.value)}
					/>
					<div>
						<Badge
							className="mr-1 pointer"
							variant="secondary"
							onClick={e =>
								setTraveled(prev => prev + travelSpeed)
							}>
							+ 1 Hour Travel
						</Badge>
						<Badge
							className="mr-1 pointer"
							variant="danger"
							onClick={e => setTraveled(0)}>
							Reset
						</Badge>
					</div>
				</Col>
			</Row>

			{/* REMAINING TRAVEL */}
			<Row className="mb-1">
				<Col>
					<h5>Remaining Distance</h5>
				</Col>
				<Col>
					<h5>{epsRound(distance - traveled)} miles</h5>
				</Col>
			</Row>
			<Row className="mb-1">
				<Col>
					<h5>Remaining Time</h5>
				</Col>
				<Col>
					<h5>{remainingTravelHours} hours</h5>
					<span className="text-black-50">
						{remainingTravelDays} travel days
					</span>
				</Col>
			</Row>
		</>
	);
}

export default TravelStats;
