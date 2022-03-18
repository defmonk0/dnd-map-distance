import { useMemo, useState } from "react";

import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";

import "./TravelStats/TravelStats.css";
import scalePoint from "../shared/scalePoint";
import useLocalStorage from "../../shared/useLocalStorage";

import paces from "./TravelStats/paces.json";

const epsRound = n => {
	return Math.round((n + Number.EPSILON) * 100) / 100;
};

function TravelStats({ points, inScale, disScale }) {
	const [traveled, setTraveled] = useLocalStorage("distance-traveled", 0);
	const [travelSpeed, setTravelSpeed] = useLocalStorage("travel-speed", 0);
	const [travelPerDay, setTravelPerDay] = useLocalStorage(
		"travel-per-day",
		8
	);
	const [showMore, setShowMore] = useState(false);

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
	const totalTravelDays = epsRound(distance / travelSpeed / travelPerDay);

	const remainingDistance = distance - traveled;
	const remainingTravelHours = epsRound(remainingDistance / travelSpeed);
	const remainingTravelDays = epsRound(
		remainingDistance / travelSpeed / travelPerDay
	);

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
						onChange={e => setTravelSpeed(e.target.value)}
					/>
					<div>
						{paces.map(
							pace =>
								(!pace.hidden || showMore) && (
									<Badge
										key={pace.type}
										className="mr-1 pointer"
										variant={pace?.color ?? "secondary"}
										onClick={() =>
											setTravelSpeed(pace.speed)
										}>
										{pace.type}
									</Badge>
								)
						)}
						<Badge
							className="mr-1 pointer"
							variant="light"
							onClick={() => setShowMore(!showMore)}>
							...
						</Badge>
					</div>
				</Col>
			</Row>

			{/* TRAVEL PER DAY */}
			<Row className="mb-3">
				<Col>
					<h5>Daily Travel (hours)</h5>
				</Col>
				<Col>
					<FormControl
						type="number"
						value={travelPerDay}
						onChange={e => setTravelPerDay(e.target.value)}
					/>
					<div>
						<Badge
							className="mr-1 pointer"
							variant="secondary"
							onClick={e => setTravelPerDay(8)}>
							On Foot
						</Badge>
						<Badge
							className="mr-1 pointer"
							variant="danger"
							onClick={e => setTravelPerDay(24)}>
							Sailing
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
