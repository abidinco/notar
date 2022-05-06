import React from 'react';

class NotarQuestionOption extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className="horizontal layout center">
				<span>{this.props.optionLetter})</span>
				<div>{this.props.optionBody}</div>
			</div>
		)
	}
}

export default NotarQuestionOption;
