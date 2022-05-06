import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconAccountCircle from 'material-ui/svg-icons/action/account-circle';
import IconPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

class LoggedInButtonAppBar extends React.Component {
	constructor(props) {
		super(props)
	}
	handleLogout() {
		Meteor.logout();
	}
	render() {
		return(
			<div className="horizontal layout center" style={{color: 'rgb(255,255,255)'}}>
				<IconButton href={"/profil/" + this.props.username}>
					<IconAccountCircle className="c-white-imp"/>
				</IconButton>
				<div>{this.props.username}</div>
				<IconButton onTouchTap={this.handleLogout.bind(this)}>
					<IconPowerSettingsNew className="c-white-imp"/>
				</IconButton>
			</div>
		)
	}
}

export default LoggedInButtonAppBar;
