import Form from "react-bootstrap/Form";

function FileSelector({ id, label, description, onChange }) {
	return (
		<Form.Group controlId="formFileSelect">
			<Form.File
				id={id}
				label={label}
				onChange={e => {
					const file = e?.target?.files?.[0];
					if (file) {
						onChange(file);
					}
				}}
				onClick={e => {
					e.target.value = null;
				}}
			/>
			<Form.Text muted>{description}</Form.Text>
		</Form.Group>
	);
}

export default FileSelector;
