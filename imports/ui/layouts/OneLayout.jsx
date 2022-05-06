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

import {ApolloProvider} from 'react-apollo';

class OneLayout extends React.Component {
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
	/* We're using Bert, unnecessary now
	componentDidMount() {
		this._notificationSystem = notificationSystem;
	}
	addNotification(title, message, level, position, autoDismiss) {
		let notificationPromise = new Promise((resolve, reject) => {
			this._notificationSystem.addNotification({
				title: title,
				message: message,
				level: level,
				position: position || 'bl',
				autoDismiss: autoDismiss
			});
			setTimeout(() => {
				resolve(this._notificationSystem)
			}, autoDismiss*1000);
		});
		notificationPromise.then((last) => {
			this._notificationSystem.removeNotification(last)
		});
	}
	*/
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
								// Using Bert now, unnecessary: this.addNotification('Fırlayan errorlar söz konusu', err.reason, 'error', 'tc', 5);
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
												// Using Bert now, unnecessary: this.addNotification('Errör', err.reason, 'warning', 'br', 5);
												Bert.alert(err.reason, 'danger', 'growl-top-right');
											} else {
												// Using Bert now, unnecessary: this.addNotification('Emailini bilahare doğrularsın', 'Girişte sıkıntı yaşarsan emailine ihtiyacın olacak', 'info', 'br', 0);
												Bert.alert('Doğrulama emaili gönderdik', 'info', 'growl-top-right');
											}
										});
										// Using Bert now, unnecessary: this.addNotification('Başarılı', 'Kaydolup giriş yaptın', 'success', 'br', 5);
										Bert.alert('Başarılı, kaydolup giriş yaptın', 'success', 'growl-top-right');
										this.handleSignDialogClose();
									}
								});
							}
						});
					} else {
						// Using Bert now, unnecessary: this.addNotification('Bu email, email değil gibi', 'Bazı desenlere uymadı', 'warning', 'tc', 5);
						Bert.alert('Bu email, geçersiz görünüyor. Bazı desenlere uymadı', 'danger', 'growl-top-right');
					}
				} else {
					// Using Bert now, unnecessary: this.addNotification('Bütün parolaların böyle mi', 'Parola çok kısa, en az 6 karakter', 'warning', 'tc', 5);
					Bert.alert('Parola çok kısa, en az 6 karakter', 'danger', 'growl-top-right');
				}
			} else {
				// Using Bert now, unnecessary: this.addNotification('data.type.STRING limitation\'dan ötürü', 'Kullanıcı adı en fazla 255 karakter', 'warning', 'tc', 5);
				Bert.alert('Kullanıcı adı 255 karakterden fazla olmasın', 'danger', 'growl-top-right');
			}
		} else {
			// Using Bert now, unnecessary: this.addNotification('Boş alanlar var', '3 alan var zaten?', 'warning', 'tc', 5);
			Bert.alert('Boş alanlar var', 'danger', 'growl-top-right');
		}
	}
	handleUserLogin() {
		let logUName = LoginUsername.input.value,
				logPass = LoginPassword.input.value;
		if(!is.any.empty(logUName, logPass)) {
			Meteor.loginWithPassword(logUName, logPass, (err, res) => {
				if(err) {
					// Using Bert now, unnecessary: this.addNotification('Fırlayan errorlar söz konusu', err.reason, 'error', 'tc', 5);
					Bert.alert(err.reason, 'danger', 'growl-top-right');
				} else {
					// TODO: if user's email is not verified
					// Bert.alert.info Emailinizi doğrulayın
					this.handleSignDialogClose();
				}
			});
		} else {
			// Using Bert now, unnecessary: this.addNotification('Boş alanlar var', 'Sahiden boş mu inputlar', 'warning', 'tc', 5);
			Bert.alert('Boş alanlar var', 'danger', 'growl-top-right');
		}
	}
	//

	render() {
		return (
			<ApolloProvider client={this.props.client}>
				<MuiThemeProvider>
						<div>
							<AppBar title={<a href="/">one</a>}
											onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
											className="one-app-bar"
											iconElementRight={this.props.currentUser ? (
												<LoggedInButtonAppBar username={this.props.currentUser.username}/>
											) : (
												<FlatButton label={TAPi18n.__("appBar.signButton")} icon={<IconAccountBox />} primary={true} onTouchTap={this.handleSignDialogOpen.bind(this)}/>
											)}/>
							{this.props.content}
							<Drawer docked={false}
										width={250}
										open={this.state.isDrawerOpen}
										onRequestChange={(isDrawerOpen) => this.setState({isDrawerOpen})}>
								<List>
									<Subheader>one</Subheader>
								</List>
								<Divider />
								<ListItem primaryText="Apps" href="/apps" leftIcon={<IconApps />} onTouchTap={this.handleDrawerToggle.bind(this)}/>
								<ListItem primaryText={TAPi18n.__("changeLanguage")}
													leftIcon={<IconLanguage />}
													nestedItems={[
														<ListItem key={0} primaryText="Türkçe" onClick={this.changeLanguageTo.bind(this, 'tr')}/>,
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

export default OneLayoutContainer = createContainer(({params}) => {
	return {
		currentUser: Meteor.user() || false,
	};
}, OneLayout);
