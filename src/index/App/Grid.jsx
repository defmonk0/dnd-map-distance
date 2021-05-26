import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Calculator from "./Grid/Calculator";
import Map from "./Grid/Map";
import useLocalStorage from "./shared/useLocalStorage";

function Grid() {
	const [points, setPoints] = useLocalStorage("points", []);

	return (
		<Row className="h-100">
			<Col xs="auto">
				<Map points={points} setPoints={setPoints} />
			</Col>
			<Col>
				<h2>Map Distance Calculator</h2>
				<hr />
				<Calculator points={points} setPoints={setPoints} />
			</Col>
		</Row>
	);
}

export default Grid;
