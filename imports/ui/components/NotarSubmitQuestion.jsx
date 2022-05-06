import React from 'react';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import RaisedButton from 'material-ui/RaisedButton';

let options = ["A", "B", "C", "D", "E"];

class NotarSubmitQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questionType: 0,
			questionOptions: 2
		}
		let QuestionToggle;
	}
	handleToggle() {
		this.setState({
			questionType: !this.state.questionType
		});
	}
	handleOptionAdd() {
		(this.state.questionOptions > 4) ? null : (this.setState({questionOptions: this.state.questionOptions+1}));
	}
	handleOptionRemove() {
		(this.state.questionOptions < 3) ? null : (this.setState({questionOptions: this.state.questionOptions-1}));
	}
	render() {
		return(
			<Paper zDepth={2} style={{padding: '1em 1.5em',margin: '2em 0'}} className="notarSubmitQuestionPaper">
				<div className="horizontal layout justified" style={{padding: '.75em'}}>
					<div>
						<Toggle ref={(toggle) => QuestionToggle = toggle} label="Test" labelPosition="right" onToggle={this.handleToggle.bind(this)}/>
					</div>
					<div style={{color: '#a9a9a9', fontSize: '1.25em'}}>{this.props.questionNumber}</div>
				</div>
				{this.state.questionType ? (
					<div className="vertical layout" style={{padding: '.75em'}}>
						<TextField hintText={this.props.questionNumber + ". soru"} floatingLabelText="Test sorusu metni" multiLine={true} rows={1} />
						<div className="vertical layout">
							{options.slice(0,this.state.questionOptions).map((option) =>
									<TextField key={option.toString()} floatingLabelText={option + ")"}  multiLine={true} rows={1} />
							)}
							<div className="horizontal layout justified" style={{marginTop: '1em'}}>
								{this.state.questionOptions < 3 ? <span></span> : <FlatButton onClick={this.handleOptionRemove.bind(this)} icon={<DeleteIcon />} style={{color: '#7f8c8d'}} />}
								{this.state.questionOptions > 4 ? <span></span> : <RaisedButton onClick={this.handleOptionAdd.bind(this)} label="EKLE" />}
							</div>
						</div>
					</div>
				) : (
					<div className="" style={{padding: '.75em'}}>
						<TextField hintText={this.props.questionNumber + ". soru"} floatingLabelText="Klasik soru metni" multiLine={true} rows={1} />
					</div>
				)}
			</Paper>
		)
	}
};

NotarSubmitQuestion.defaultProps = {
	questionNumber: 1
};

export default NotarSubmitQuestion;
