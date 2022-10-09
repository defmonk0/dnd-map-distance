import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Calculator from "./Grid/Calculator";
import Map from "./Grid/Map";
import useLocalStorage from "./shared/useLocalStorage";

import "./Grid/Grid.css";

function Grid() {
	const [points, setPoints] = useLocalStorage("points", []);

	return (
		<Row className="h-100">
			<Col xs="auto">
				<Map points={points} setPoints={setPoints} />
			</Col>
			<Col className="scrollable">
				<h2>Map Distance Calculator</h2>
				<hr />
				<Calculator points={points} setPoints={setPoints} />
			</Col>
		</Row>
	);
}

export default Grid;
