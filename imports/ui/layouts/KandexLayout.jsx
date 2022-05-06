import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//
import is from 'is_js';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import {Accounts} from 'meteor/accounts-base';
import Subheader from 'material-ui/Subheader';
import SnackbarInfo from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import {createContainer} from 'meteor/react-meteor-data';
import IconApps from 'material-ui/svg-icons/navigation/apps';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconLanguage from 'material-ui/svg-icons/action/language';
import IconAccountBox from 'material-ui/svg-icons/action/account-box';
import LoggedInButtonAppBar from '../components/LoggedInButtonAppBar';
//

import {ApolloProvider} from 'react-apollo';

class KandexLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDrawerOpen: false,
			isSignDialogOpen: false,
			isSignDialogOnLogin: true,
			isSnackbarInfoOpen: false,
			snackbarMessage: ""
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
			if(regUName.length < 254) { // Cause Sequelize.STRING
				if(regPass.length > 5) { // Security reasons?
					if(is.email(regEmail)) {
						// Create User
						Accounts.createUser({
							username: regUName,
							email: regEmail,
							password: regPass,
							registeredAt: new Date()
						}, (err, res) => {
							if(err) {
								this.setState({
									snackbarMessage: "Fırlayan errorlar söz konusu: " + err.reason,
									isSnackbarInfoOpen: true
								});
							} else {
								this.setState({
									snackbarMessage: "Kaydolup giriş yaptınız, emailinizi bilahare doğrularsınız",
									isSnackbarInfoOpen: true
								});
								this.handleSignDialogClose();
							}
						});
						/*
						if(Meteor.isClient) {
							Meteor.call('user.register', regUName, regPass, regEmail);
						}
						*/
					} else {
						this.setState({
							snackbarMessage: "Email adresiniz albayım.. Bazı desenlere uymuyor",
							isSnackbarInfoOpen: true
						});
					}
				} else {
					this.setState({
						snackbarMessage: "Parola en az 5 karakter",
						isSnackbarInfoOpen: true
					});
				}
			} else {
				this.setState({
					snackbarMessage: "Username max 254 karakter olsun",
					isSnackbarInfoOpen: true
				});
			}
		} else {
			this.setState({
				snackbarMessage: "Boş alanlar var",
				isSnackbarInfoOpen: true
			});
		}
	}
	handleUserLogin() {
		let logUName = LoginUsername.input.value,
				logPass = LoginPassword.input.value;
		if(!is.any.empty(logUName, logPass)) {
			Meteor.loginWithPassword(logUName, logPass, (err, res) => {
				if(err) {
					this.setState({
						snackbarMessage: "Bazı sıkıntılar söz konusu: " + err.reason,
						isSnackbarInfoOpen: true
					});
				} else {
					this.handleSignDialogClose();
					this.setState({
						snackbarMessage: "",
						isSnackbarInfoOpen: false
					});
				}
			});
		} else {
			this.setState({
				snackbarMessage: "Boş alanlar var",
				isSnackbarInfoOpen: true
			});
		}
	}
	//
	render() {
	//
	const styles = {
		signFields: {
			marginLeft: 20,
			paddingRight: 20
		},
		signButtons: {
			margin: '10px 5px'
		},
		signDrawerContainer: {
			width: 350
		},
		signDrawerStyle: {
			background: 'rgba(0,0,0,.2)'
		},
		signDrawerCloseIcon: {
			position: 'absolute',
			right: -10,
			top: -6
		}
	};
	//
		return (
			<ApolloProvider client={this.props.client}>
				<MuiThemeProvider>
					<div>
						<AppBar title={<a href="/kandex">kandex</a>}
										onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}
										style={{backgroundColor: 'rgb(241, 196, 15)'}}
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
						<MenuItem leftIcon={<Avatar style={{height:30,width:30}} src="/pp.jpg" />}>
								seabey
						</MenuItem>
						<Divider />
						<List>
							<Subheader>one</Subheader>
							<ListItem primaryText="Apps" href="/apps" leftIcon={<IconApps />} />
						</List>
						<ListItem primaryText={TAPi18n.__("changeLanguage")}
											leftIcon={<IconLanguage />}
											nestedItems={[
												<ListItem key={0} primaryText="Türkçe" onClick={this.changeLanguageTo.bind(this, 'tr')}/>,
												<ListItem key={1} primaryText="English" onClick={this.changeLanguageTo.bind(this, 'en')}/>
											]} />
						</Drawer>
						<Dialog modal={true} contentStyle={styles.signDrawerContainer} style={styles.signDrawerStyle} open={this.state.isSignDialogOpen}>
							<div className="vertical layout center-center relative">
								<IconButton onTouchTap={this.handleSignDialogClose.bind(this)} style={styles.signDrawerCloseIcon}><IconClose className="grey-700-imp"/></IconButton>
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
									<TextField style={styles.signFields}
															hintText={TAPi18n.__("signDialog.registerUsernameHint")}
															floatingLabelText={TAPi18n.__("signDialog.registerUsernameFloating")}
															underlineShow={false}
															ref={(input) => RegisterUsername = input}/>
									<Divider />
									<TextField style={styles.signFields}
															hintText={TAPi18n.__("signDialog.registerPasswordHint")}
															floatingLabelText={TAPi18n.__("signDialog.registerPasswordFloating")}
															type="password"
															underlineShow={false}
															ref={(input) => RegisterPassword = input}/>
									<Divider />
									<TextField style={styles.signFields}
															hintText={TAPi18n.__("signDialog.registerEmailHint")}
															floatingLabelText={TAPi18n.__("signDialog.registerEmailFloating")}
															underlineShow={false}
															ref={(input) => RegisterEmail = input}/>
									<Divider />
									<div className="flex horizontal layout center-center">
									<RaisedButton primary={true}
																style={styles.signButtons}
																label={TAPi18n.__("signDialog.registerButton")}
																onClick={this.handleUserRegister.bind(this)}/>
									</div>
								</div>
								) : (

									// Login Form
								<div>
									<TextField style={styles.signFields}
															hintText={TAPi18n.__("signDialog.loginUsernameHint")}
															underlineShow={false}
															ref={(input) => LoginUsername = input}/>
									<Divider />
									<TextField style={styles.signFields}
															hintText={TAPi18n.__("signDialog.loginPasswordHint")}
															type="password"
															underlineShow={false}
															ref={(input) => LoginPassword = input}/>
									<Divider />
									<div className="flex horizontal layout justified">
									<FlatButton style={styles.signButtons}
															label={TAPi18n.__("signDialog.forgot")}/>
									<RaisedButton primary={true}
																style={styles.signButtons}
																label={TAPi18n.__("signDialog.loginButton")}
																onClick={this.handleUserLogin.bind(this)}/>
									</div>
								</div>
								)}
							</div>
						</Dialog>
						<SnackbarInfo open={this.state.isSnackbarInfoOpen} message={this.state.snackbarMessage} autoHideDuration={4000} />
					</div>
				</MuiThemeProvider>
			</ApolloProvider>
		);
	}
};
export default KandexLayoutContainer = createContainer(({params}) => {
	return {
		currentUser: Meteor.user() || false,
	};
}, KandexLayout);
