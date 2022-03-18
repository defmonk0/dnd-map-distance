import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ScaleInput from "./InputScale/ScaleInput";

function InputScaleDescription({ inScale, disScale }) {
	return (
		<Accordion>
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey="1">
					Details...
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="1">
					<Card.Body>
						Based on these inputs, every{" "}
						<span className="text-primary">{inScale} pixels</span>{" "}
						on the original size image is{" "}
						<span className="text-success">{disScale} miles</span>.
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}

function InputScaleInputs({ inScale, setInScale, disScale, setDisScale }) {
	return (
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
		</Row>
	);
}

function InputScale({ inScale, setInScale, disScale, setDisScale }) {
	return (
		<div className="mb-1">
			<Accordion>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">
						Input Scale
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<InputScaleInputs
								{...{
									inScale,
									setInScale,
									disScale,
									setDisScale,
								}}
							/>
							<InputScaleDescription {...{ inScale, disScale }} />
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</div>
	);
}

export default InputScale;
