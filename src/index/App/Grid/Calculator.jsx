import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import PointsList from "./Calculator/PointsList";
import ScaleInput from "./Calculator/ScaleInput";
import TravelStats from "./Calculator/TravelStats";
import useLocalStorage from "../shared/useLocalStorage";

function Calculator({ points, setPoints }) {
	const [inScale, setInScale] = useLocalStorage("input-scale", 25);
	const [disScale, setDisScale] = useLocalStorage("distance-scale", 25);

	return (
		<>
			<Row>
				<Col>
					<ScaleInput
						id="inputScale"
						label="Input Scale"
						description="Size in pixels from original image size to use as a baseline."
						scale={inScale}
						setScale={setInScale}
					/>
				</Col>
				<Col>
					<ScaleInput
						id="distanceScale"
						label="Distance Scale"
						description="How far the input represents in miles."
						scale={disScale}
						setScale={setDisScale}
					/>
				</Col>
				<Col xs={12}>
					<Alert variant="secondary">
						Based on these inputs, every{" "}
						<span className="text-primary">{inScale} pixels</span>{" "}
						on the original size image is{" "}
						<span className="text-success">{disScale} miles</span>.
					</Alert>
				</Col>
			</Row>

			<hr />

			<TravelStats
				points={points}
				inScale={inScale}
				disScale={disScale}
			/>

			<hr />

			{points.length > 0 ? (
				<Button
					variant="danger"
					className="mb-4 btn-block"
					onClick={() => setPoints([])}>
					Reset Points
				</Button>
			) : null}

			<PointsList points={points} setPoints={setPoints} />
		</>
	);
}

export default Calculator;
