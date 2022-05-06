import React from 'react';
import IconSocialPoll from 'material-ui/svg-icons/social/poll';
import IconQuestionAnswer from 'material-ui/svg-icons/action/question-answer';
import IconInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';

import ProfileChip from '../components/ProfileChip';

class NotarDocumentsListItem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<a href="/notar/not/123123?t=genel" className="notar-documents-list-item vertical layout">
				<div className="horizontal layout center justified wrap">
					<div className="horizontal layout center">
						<img src={"/universityLogos/" + this.props.university + ".png"} className="mr-0-5"/>
						<span className="ml-0-3">{this.props.university}</span>
						<span className="ml-0-3">{this.props.faculty}</span>
						<span className="ml-0-3">{this.props.lesson}</span>
						<span className="ml-0-3">{this.props.type}</span>
						<span className="grey-700 ml-0-5 fs-0-8">{this.props.year}</span>
					</div>
					<div className="horizontal layout center wrap">
						{this.props.question ? (
							<div className="horizontal layout center wrap">
								<span className="grey-700 mr-0-3">Soru</span>
								<IconSocialPoll className="grey-700-imp"/>
							</div>
						) : (
							<span></span>
						)}
						{this.props.file ? (
							<div className="horizontal layout center wrap">
								<span className="grey-700 ml-1 mr-0-3">Dosya</span>
								<IconInsertDriveFile className="grey-700-imp" />
							</div>
						) : (
							<span></span>
						)}
						<span className="grey-700 mr-0-3 ml-1">{this.props.commentCount}</span>
						<IconQuestionAnswer className="grey-700-imp"/>
						<span className="grey-700 mr-0-3 ml-1">{this.props.ago} önce</span>
						<ProfileChip username={this.props.owner}/>
					</div>
				</div>
			</a>
		)
	}
}

export default NotarDocumentsListItem;
