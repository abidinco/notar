import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import IconApps from 'material-ui/svg-icons/navigation/apps';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// New imports after SignDialog
import is from 'is_js';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {Accounts} from 'meteor/accounts-base';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import {createContainer} from 'meteor/react-meteor-data';
import stylesSignDialog from '../styles/signDialog';
// Unnecessary now:  import NotificationSystem from 'react-notification-system';
import IconClose from 'material-ui/svg-icons/navigation/close';
// Unnecessary now: import stylesNotificationItem from '../styles/notificationItem';
import IconLanguage from 'material-ui/svg-icons/action/language';
import IconAccountBox from 'material-ui/svg-icons/action/account-box';
import LoggedInButtonAppBar from '../components/LoggedInButtonAppBar';
import {Bert} from 'meteor/themeteorchef:bert';
//

import IconFileUpload from 'material-ui/svg-icons/file/file-upload';

import {ApolloProvider} from 'react-apollo';

class NotarLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDrawerOpen: false,
			isSignDialogOpen: false,
			isSignDialogOnLogin: true
		};
		const LoginUsername = LoginPassword = RegisterUsername = RegisterPassword = RegisterEmail = null;
	}
	handleDrawerToggle(){
		this.setState({isDrawerOpen: !this.state.isDrawerOpen});
	}
	//
	handleSignDialogOpen(){
		this.setState({isSignDialogOpen: true})
	}
	handleSignDialogClose(){
		this.setState({isSignDialogOpen: false})
	}
	flipSignDialog() {
		this.setState({isSignDialogOnLogin: !this.state.isSignDialogOnLogin})
	}
	changeLanguageTo(lang) {
		TAPi18n.setLanguage(lang);
		this.handleDrawerToggle();
	}
	handleUserRegister() {
		let regUName = RegisterUsername.input.value,
				regPass = RegisterPassword.input.value,
				regEmail = RegisterEmail.input.value;
		if(!is.any.empty(regUName, regPass, regEmail)) {
			if(regUName.length < 254) { // Cause Sequelize.STRING limitation
				if(regPass.length > 5) { // Security reasons?
					if(is.email(regEmail)) {
						// Insert to Mongo
						Accounts.createUser({
							username: regUName,
							email: regEmail,
							password: regPass,
							registeredAt: new Date()
						}, (err) => {
							if(err) {
								// Using Bert now, unnecessary: this.addNotification('F??rlayan errorlar s??z konusu', err.reason, 'error', 'tc', 5);
								Bert.alert(err.reason, 'danger', 'growl-top-right');
							} else {
								// Insert to postgres
								Meteor.call('user.register', regUName, (err) => {
									if(err) {
										Bert.alert(err.reason, 'danger', 'growl-top-right');
									} else {
										// Send Verification Email
										Meteor.call('email.verification', (err) => {
											if(err) {
												console.log('call.email.send err: ' + err);
												// Using Bert now, unnecessary: this.addNotification('Err??r', err.reason, 'warning', 'br', 5);
												Bert.alert(err.reason, 'danger', 'growl-top-right');
											} else {
												// Using Bert now, unnecessary: this.addNotification('Emailini bilahare do??rulars??n', 'Giri??te s??k??nt?? ya??arsan emailine ihtiyac??n olacak', 'info', 'br', 0);
												Bert.alert('Do??rulama emaili g??nderdik', 'info', 'growl-top-right');
											}
										});
										// Using Bert now, unnecessary: this.addNotification('Ba??ar??l??', 'Kaydolup giri?? yapt??n', 'success', 'br', 5);
										Bert.alert('Ba??ar??l??, kaydolup giri?? yapt??n', 'success', 'growl-top-right');
										this.handleSignDialogClose();
									}
								});
							}
						});
					} else {
						// Using Bert now, unnecessary: this.addNotification('Bu email, email de??il gibi', 'Baz?? desenlere uymad??', 'warning', 'tc', 5);
						Bert.alert('Bu email, ge??ersiz g??r??n??yor. Baz?? desenlere uymad??', 'danger', 'growl-top-right');
					}
				} else {
					// Using Bert now, unnecessary: this.addNotification('B??t??n parolalar??n b??yle mi', 'Parola ??ok k??sa, en az 6 karakter', 'warning', 'tc', 5);
					Bert.alert('Parola ??ok k??sa, en az 6 karakter', 'danger', 'growl-top-right');
				}
			} else {
				// Using Bert now, unnecessary: this.addNotification('data.type.STRING limitation\'dan ??t??r??', 'Kullan??c?? ad?? en fazla 255 karakter', 'warning', 'tc', 5);
				Bert.alert('Kullan??c?? ad?? 255 karakterden fazla olmas??n', 'danger', 'growl-top-right');
			}
		} else {
			// Using Bert now, unnecessary: this.addNotification('Bo?? alanlar var', '3 alan var zaten?', 'warning', 'tc', 5);
			Bert.alert('Bo?? alanlar var', 'danger', 'growl-top-right');
		}
	}
	handleUserLogin() {
		let logUName = LoginUsername.input.value,
				logPass = LoginPassword.input.value;
		if(!is.any.empty(logUName, logPass)) {
			Meteor.loginWithPassword(logUName, logPass, (err, res) => {
				if(err) {
					// Using Bert now, unnecessary: this.addNotification('F??rlayan errorlar s??z konusu', err.reason, 'error', 'tc', 5);
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					// TODO: if user's email is not verified
					// Bert.alert.info Emailinizi do??rulay??n
					this.handleSignDialogClose();
				}
			});
		} else {
			// Using Bert now, unnecessary: this.addNotification('Bo?? alanlar var', 'Sahiden bo?? mu inputlar', 'warning', 'tc', 5);
			Bert.alert('Bo?? alanlar var', 'danger', 'growl-top-right');
		}
	}
	//
	render() {
	//
		return (
			<ApolloProvider client={this.props.client}>
				<MuiThemeProvider>
					<div>
						<AppBar title={<a href="/notar">notar</a>}
										onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
										iconElementRight={this.props.currentUser ? (
											<LoggedInButtonAppBar username={this.props.currentUser.username}/>
										) : (
											<FlatButton label={TAPi18n.__("appBar.signButton")} icon={<IconAccountBox />} primary={true} onTouchTap={this.handleSignDialogOpen.bind(this)}/>
										)}/>
							{this.props.content}
							<Drawer docked={false} width={250} open={this.state.isDrawerOpen}
											onRequestChange={(isDrawerOpen) => this.setState({isDrawerOpen})}>
								<List>
									<Subheader>one</Subheader>
									<ListItem leftIcon={<IconFileUpload />} onTouchTap={this.handleDrawerToggle.bind(this)}
														primaryText="Dok??man Y??kle" href="/notar/yukle"/>
								</List>
								<Divider />
								<ListItem primaryText="Apps" href="/apps" leftIcon={<IconApps />} />
								<ListItem primaryText={TAPi18n.__("changeLanguage")}
													leftIcon={<IconLanguage />}
													nestedItems={[
														<ListItem key={0} primaryText="T??rk??e" onClick={this.changeLanguageTo.bind(this, 'tr')}/>,
														<ListItem key={1} primaryText="English" onClick={this.changeLanguageTo.bind(this, 'en')}/>
													]} />
							</Drawer>
							<Dialog modal={true} contentStyle={stylesSignDialog.signDrawerContainer} style={stylesSignDialog.signDrawerStyle} open={this.state.isSignDialogOpen} autoScrollBodyContent={true}>
								<div className="vertical layout center-center relative">
									<IconButton onTouchTap={this.handleSignDialogClose.bind(this)} style={stylesSignDialog.signDrawerCloseIcon}><IconClose className="grey-700-imp"/></IconButton>
									<div className="horizontal layout center">
										<RaisedButton label={TAPi18n.__("signDialog.registerTabButton")}
																	primary={true}
																	disabled={this.state.isSignDialogOnLogin ? true : false}
																	onTouchTap={this.flipSignDialog.bind(this)}
																	/>
										<RaisedButton label={TAPi18n.__("signDialog.loginTabButton")}
																	primary={true}
																	disabled={this.state.isSignDialogOnLogin ? false : true}
																	onTouchTap={this.flipSignDialog.bind(this)}
																	/>
									</div>
									{this.state.isSignDialogOnLogin ? (
										// Register Form
									<div>
										<TextField style={stylesSignDialog.signFields}
																hintText={TAPi18n.__("signDialog.registerUsernameHint")}
																floatingLabelText={TAPi18n.__("signDialog.registerUsernameFloating")}
																underlineShow={false}
																ref={(input) => RegisterUsername = input}/>
										<Divider />
										<TextField style={stylesSignDialog.signFields}
																hintText={TAPi18n.__("signDialog.registerPasswordHint")}
																floatingLabelText={TAPi18n.__("signDialog.registerPasswordFloating")}
																type="password"
																underlineShow={false}
																ref={(input) => RegisterPassword = input}/>
										<Divider />
										<TextField style={stylesSignDialog.signFields}
																hintText={TAPi18n.__("signDialog.registerEmailHint")}
																floatingLabelText={TAPi18n.__("signDialog.registerEmailFloating")}
																underlineShow={false}
																ref={(input) => RegisterEmail = input}/>
										<Divider />
										<div className="flex horizontal layout center-center">
										<RaisedButton primary={true}
																	style={stylesSignDialog.signButtons}
																	label={TAPi18n.__("signDialog.registerButton")}
																	onClick={this.handleUserRegister.bind(this)}/>
										</div>
									</div>
									) : (

										// Login Form
									<div>
										<TextField style={stylesSignDialog.signFields}
																hintText={TAPi18n.__("signDialog.loginUsernameHint")}
																underlineShow={false}
																ref={(input) => LoginUsername = input}/>
										<Divider />
										<TextField style={stylesSignDialog.signFields}
																hintText={TAPi18n.__("signDialog.loginPasswordHint")}
																type="password"
																underlineShow={false}
																ref={(input) => LoginPassword = input}/>
										<Divider />
										<div className="flex horizontal layout justified">
										<FlatButton style={stylesSignDialog.signButtons}
																label={TAPi18n.__("signDialog.forgot")}
																href="/oturum/unuttum"
																onClick={this.handleSignDialogClose.bind(this)}/>
										<RaisedButton primary={true}
																	style={stylesSignDialog.signButtons}
																	label={TAPi18n.__("signDialog.loginButton")}
																	onClick={this.handleUserLogin.bind(this)}/>
										</div>
									</div>
									)}
								</div>
							</Dialog>
						</div>
				</MuiThemeProvider>
			</ApolloProvider>
		);
	}
};


export default NotarLayoutContainer = createContainer(({params}) => {
	return {
		currentUser: Meteor.user() || false,
	};
}, NotarLayout);
