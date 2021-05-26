import Form from "react-bootstrap/Form";

function ScaleInput({ id, label, description, scale, setScale }) {
	return (
		<Form.Group controlId="formBasicEmail">
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type="number"
				value={scale}
				onChange={e => setScale(e.target.value)}
			/>
			<Form.Text className="text-muted">{description}</Form.Text>
		</Form.Group>
	);
}

export default ScaleInput;