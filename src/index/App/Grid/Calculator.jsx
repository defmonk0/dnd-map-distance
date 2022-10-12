import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import PointsList from "./Calculator/PointsList";
import InputScale from "./Calculator/InputScale";
import TravelStats from "./Calculator/TravelStats";
import useLocalStorage from "../shared/useLocalStorage";

function Calculator({ points, setPoints, userMap, setUserMap }) {
	const [inScale, setInScale] = useLocalStorage("input-scale", 25);
	const [disScale, setDisScale] = useLocalStorage("distance-scale", 25);

	return (
		<>
			<Row>
				<Col xs={12}>
					<InputScale
						inScale={inScale}
						setInScale={setInScale}
						disScale={disScale}
						setDisScale={setDisScale}
						userMap={userMap}
						setUserMap={setUserMap}
					/>
				</Col>
			</Row>

			<hr />

			<TravelStats
				points={points}
				inScale={inScale}
				disScale={disScale}
			/>

			<hr />

			<PointsList points={points} setPoints={setPoints} />

			{points.length > 0 ? (
				<Button
					variant="danger"
					className="btn-block"
					onClick={() => setPoints([])}>
					Reset Points
				</Button>
			) : null}
		</>
	);
}

export default Calculator;
