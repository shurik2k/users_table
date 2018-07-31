import React, {Component} from "react"
import {connect} from "react-redux"
import TableCell from "../TableCell"
import "../App.css";

const styles = {
	buttonCell: {
		textAlign: 'center'
	},
	tableButton: {
		margin: '5px',
		minWidth: '90px'
	},
	counterCell: {
		textAlign: 'center'
	}
}
class TableRow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			user: this.props.user
		};

		this.updateUserData = this.updateUserData.bind(this);
		this.cancelEdition = this.cancelEdition.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	changeEditMode() {
		this.setState(prevState => ({editMode: !prevState.editMode}));
	}

	editItem() {
		this.props.onEditItem(this.state.user, this.props.id);
	}

	updateUserData(info) {
		const preparedInfo = {[info.title]: info.meaning};
		this.setState({user: {...this.state.user, ...preparedInfo}});
	}

	cancelEdition() {
		const unchangedData = this.props.store[this.props.id];
		this.setState({user: unchangedData});
		this.changeEditMode();
	}

	deleteItem() {
		this.props.onDeleteItem(this.props.id);
	}

	render() {
		const {editMode, user} = this.state;
		const {id} = this.props;
		return (
			<tr key={this.props.store[id].candidateName}>
				<td className="text-center">{this.props.id + 1}</td>
				{Object.entries(user)
					.map(user => ({title: user[0], meaning: user[1]}))
					.map(characteristic => {
						return (
							<TableCell
								key={characteristic.title}
								value={characteristic}
								editMode={editMode}
								onValueChange={this.updateUserData}
							/>
						);
					})}
				<td className="text-center">
					{!editMode ?
						[
							<button
								key="edit"
								onClick={() => {
									this.changeEditMode();
								}}
								className="btn btn-sm primary-color"
							>
								Edit
							</button>,
							<button
								key="delete"
								onClick={this.deleteItem}
								className="btn btn-sm danger-color">
								Delete
							</button>
						]
						:
						[
							<button
								key="save"
								onClick={() => {
									this.changeEditMode();
									this.editItem();
								}}
								className="btn btn-sm primary-color"
							>
								Save
							</button>,
							<button key="cancel"
									onClick={this.cancelEdition}
									className="btn btn-sm danger-color">
								Cancel
							</button>
						]}
				</td>
			</tr>
		);
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onEditItem: (user, id) => {
			dispatch({type: "EDIT_ITEM", user, id});
		},
		onDeleteItem: id => {
			dispatch({type: "DELETE_ITEM", id});
		}
	})
)(TableRow);
