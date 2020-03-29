import React, { Component } from 'react';
export default class UserName extends Component {

	state = {
		eventAppeared: '',
	}
	dataTransfer = this.props.dataTransfer;
	yourNameState = this.props.yourNameState;

	onEventChange = (e) => {
		this.setState({
			eventAppeared: e.target.value
		})
		this.dataTransfer(e.target.value);
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.setBlue(this.state.eventAppeared);

		const dataWinnerUser = {
				'winner': this.state.eventAppeared,
				"date": new Date().getHours() + ":" + new Date().getMinutes() + "; " +
						new Date().getDate() + " " + (new Date().toLocaleString("en-us", {month: "long"})) +
						" " + new Date().getFullYear()
			}

		const dataWinnerComputer = {
				"winner": "Computer",
				"date": new Date().getHours() + ":" + new Date().getMinutes() + "; " +
						new Date().getDate() + " " + (new Date().toLocaleString("en-us", {month: "long"})) +
						" " + new Date().getFullYear()
			}

		fetch ('https://starnavi-frontend-test-task.herokuapp.com/winners', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
		body: this.props.userPoints > 12 ? (JSON.stringify(dataWinnerUser)) : (JSON.stringify( dataWinnerComputer ))
		});


		fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: this.props.computerScores > 12 ? (JSON.stringify(dataWinnerComputer)) : (JSON.stringify(dataWinnerUser))
		});
	}

	render() {
		return (
				<form className='form-group username-form'>
					<div className="d-flex">
						<label>
							<input placeholder='user-Name'
									 className="form-control"
									 type='text'
									 onChange={this.onEventChange}/>
						</label>

						<div>
							<input type="submit"
									 value = {this.props.computerScores > 12
									 ||
									 this.props.userPoints > 12 ? "PLAY AGAIN" : "PLAY"}
									 className="btn btn-secondary btn"
									 onClick={this.onSubmit}/>
						</div>
					</div>
				</form>

		)
	}
}