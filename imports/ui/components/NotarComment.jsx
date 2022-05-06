import React from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconReply from 'material-ui/svg-icons/content/reply';
import IconUpdate from 'material-ui/svg-icons/action/update';
import IconBookmark from 'material-ui/svg-icons/action/bookmark';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import ProfileChip from '../components/ProfileChip';

class NotarComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialog: false
		};
	}
	handleDialogClose() {
		this.setState({
			openDialog: false
		});
	}
	handleDialogOpen() {
		this.setState({
			openDialog: true
		});
	}
	render() {
		let dialogActions = [
			<RaisedButton label="Kapa" primary={true} onTouchTap={this.handleDialogClose.bind(this)} />
		];
		return(
			<Paper zDepth={1} className={this.props.sub ? ("notar-comment-box vertical sub layout") : ("notar-comment-box vertical layout")}>
				<div className="mb-1">
					<span className="timeago">3s önce</span>
					{this.props.body}
				</div>
				<Divider style={{height: 1}}/>
				<div className="horizontal layout center justified mt-1">
					<div className="horizontal layout center">
						<IconButton touch={true}>
							<IconKeyboardArrowDown className="grey-700-imp"/>
						</IconButton>
						<div className="fs-0-8 grey-700">180</div>
						<IconButton touch={true}>
							<IconKeyboardArrowUp className="grey-700-imp"/>
						</IconButton>
					</div>
					<div className="horizontal layout center">
						<ProfileChip username={this.props.author} />
						<IconMenu anchorOrigin={{horizontal: 'right', vertical: 'top'}}
											targetOrigin={{horizontal: 'right', vertical: 'top'}}
											iconButtonElement={
												<IconButton touch={true}>
													<IconMoreVert className="grey-700-imp"/>
												</IconButton>
											}>
							<MenuItem primaryText="Bildir" />
							<MenuItem primaryText="Engelle" />
					</IconMenu>
					<IconButton touch={true} tooltip="Kaydet" tooltipPosition="top-center">
						<IconBookmark className="grey-700-imp"/>
					</IconButton>
					<IconButton touch={true} tooltip="Yorum geçmişi" tooltipPosition="top-center" onClick={this.handleDialogOpen.bind(this)}>
						<IconUpdate className="grey-700-imp"/>
					</IconButton>
					<IconButton touch={true} tooltip="Yanıtla" tooltipPosition="top-center">
						<IconReply className="grey-700-imp"/>
					</IconButton>
					</div>
				</div>
				<Dialog title="Yorum Geçmişi"
								actions={dialogActions}
								modal={false}
								open={this.state.openDialog}
								onRequestClose={this.handleDialogClose.bind(this)}
								autoScrollBodyContent={true}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</Dialog>
			</Paper>
		)
	}
};

NotarComment.defaultProps = {
	sub: false,
	author: "nobody",
	body: "none"
}

export default NotarComment;
