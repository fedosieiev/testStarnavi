import React, { Component } from 'react';

export default class GameLevel extends Component {
	state = {
		selectedValue: "choose-level",
	}
	caughtLevel=this.props.caughtLevel;

	onSelectChange = (e) =>{
		this.setState ({
			selectedValue: e.target.value
		});
		this.caughtLevel(e.target.value);
	}

	render() {
		return(
				<form className='form-group' >
					<select
							value = {this.state.selectedValue}
							onChange={this.onSelectChange}
							className="custom-select">
						<option className="dropdown-item" value="choose-level">Choose level</option>
						<option className="dropdown-item" value="low">Low</option>
						<option className="dropdown-item" value="average">Average</option>
						<option className="dropdown-item" value="high">High</option>
					</select>
				</form>




		)
	}
}