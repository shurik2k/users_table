import React, { Component } from "react"
import "../App.css";

class TableCell extends Component {
	constructor(props) {
		super(props);

		this.state = props.value;

		this.changeValue = this.changeValue.bind(this);
	}

	changeValue(e) {
		const { value } = e.target;
		this.setState({ meaning: value }, () => {
			this.props.onValueChange(this.state)
		});
	}

	render() {
		const { editMode } = this.props;
		const { meaning } = this.state;
		return (
			<td className="text-center">
				<input
					value={meaning}
					disabled={!editMode}
					onChange={this.changeValue}
					className="text-center form-control table-cell-input"
				/>
			</td>
		);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value.meaning !== this.props.value.meaning) {
			this.setState({ meaning: this.props.value.meaning });
		}
	}
}

export default TableCell
