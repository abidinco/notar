import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import NotarQuestionOption from '../components/NotarQuestionOption';

class NotarQuestion extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
				<Paper zDepth={2} className="notar-question-box">
					<span className="question-number">{this.props.questionNumber}</span>
					<div className="mb-1">
					{this.props.questionBody}
					</div>
					{this.props.test ? (
						<div>
							<div className="options mt-1 vertical layout">
								{this.props.questionOptions.map((option, i) =>
									<NotarQuestionOption key={i} optionLetter={option.letter} optionBody={option.body} />
								)}
							</div>
						</div>
					) : (<span></span>)}
				</Paper>
				<div className="notar-below-question-box horizontal layout center justified">
					<FlatButton className="grey-800" label="YOR" />
					<a href="">{this.props.commentCount} yoru</a>
				</div>
			</div>
		)
	}
}

NotarQuestion.defaultProps = {

}

export default NotarQuestion;
