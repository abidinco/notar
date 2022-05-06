import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

class ProfileChip extends React.Component {
	constructor(props) {
		super(props)
	}
	handleChipTouchTap(username) {
		let params = {_username: username};
		let path = FlowRouter.path('profileRoute', params);
		FlowRouter.go(path);
	}
	render() {
		return(
			<Chip onTouchTap={this.handleChipTouchTap.bind(this, this.props.username)}
						style={{backgroundColor: 'rgb(239, 239, 239)'}}>
				<Avatar style={{width:33,height:33}} src="/pp.jpg" />
				{this.props.username}
			</Chip>
		)
	}
}

export default ProfileChip;
