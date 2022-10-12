import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Calculator from "./Grid/Calculator";
import Map from "./Grid/Map";
import useLocalStorage from "./shared/useLocalStorage";

import "./Grid/Grid.css";

function Grid() {
	const [points, setPoints] = useLocalStorage("points", []);
	const [userMap, setUserMap] = useLocalStorage("user-map", {
		name: null,
		data: null,
	});

	return (
		<Row className="h-100">
			<Col>
				<Map points={points} setPoints={setPoints} userMap={userMap} />
			</Col>
			<Col xs="3" className="scroll">
				<h2>Map Distance Calculator</h2>
				<hr />
				<Calculator
					points={points}
					setPoints={setPoints}
					userMap={userMap}
					setUserMap={setUserMap}
				/>
			</Col>
		</Row>
	);
}

export default Grid;
