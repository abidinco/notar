import React from 'react';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import LogoOne from '../components/LogoOne.jsx';

let formStyle = {
    width: 350,
		marginTop: 40
}, fieldsStyle = {
  marginLeft: 20,
  paddingRight: 20
}, buttonStyle = {
  margin: '10px 5px'
};

class OneSignPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: true
		};
		let LoginUsername,
				LoginPassword,
				RegisterUsername,
				RegisterPassword,
				RegisterEmail;
	}
	flipSignUp() {
		this.setState({
			login: false
		});
	}
	flipSignIn() {
		this.setState({
			login: true
		});
	}
	registerUser() {
		let regUName = RegisterUsername.input.value,
				regPass = RegisterPassword.input.value,
				regEmail = RegisterEmail.input.value;
		if(regUName && regPass && regEmail) {
			if(regPass.length < 5) {
				console.log('Pass 5ten az');
			} else {
				console.log(regUName, regPass, regEmail);
				/*
				const user = {regUName, regPass, regEmail};

				WorldSchema.mutate(`
					{
						user: createHuman(
							username: "${regUName}",
							password: "${regPass}",
							email: "${regEmail}"
						) {
							username,
							password,
							email
						}
					}
				`).then((createdUser) => {
					console.log(createdUser);
				}, (error) => {
					alert(error.message);
				});
				*/
			}
		}
	}
	loginUser() {
		console.log(LoginUsername.input.value, LoginPassword.input.value);
	}
	render() {
		return (
			<div className="vertical flex layout center">
				<div style={formStyle} className="vertical layout center-center">
					<div className="horizontal layout center" style={{marginBottom: 20}}>
						{/* Toggle Form From Login to Register */}
							<RaisedButton label="KAYDOL"
														primary={true}
														disabled={this.state.login ? false : true}
														onClick={this.flipSignUp.bind(this)}/>
							<RaisedButton label="GİRİŞ YAP"
														primary={true}
														disabled={this.state.login ? true : false}
														onClick={this.flipSignIn.bind(this)}/>
					</div>
					{this.state.login ?
						// Login Form
						<Paper zDepth={1}>
							<TextField style={fieldsStyle}
													hintText="Kullanıcı Adı veya Email"
													underlineShow={false}
													ref={(input) => LoginUsername = input}/>
							<Divider />
							<TextField style={fieldsStyle}
													hintText="Parola"
													type="password"
													underlineShow={false}
													ref={(input) => LoginPassword = input}/>
							<Divider />
							<div className="flex horizontal layout justified">
								<FlatButton style={buttonStyle}
														label="Unuttum?"
														href="/oturum/unuttum"/>
								<RaisedButton primary={true}
															style={buttonStyle}
															label="GİRİŞ"
															ref={(button) => LoginButton = button}
															onClick={this.loginUser.bind(this)}/>
							</div>
						</Paper>
					: // And Then Register Form
						<Paper zDepth={1}>
							<TextField style={fieldsStyle}
													hintText="<3 karakter"
													floatingLabelText="Kullanıcı Adı"
													underlineShow={false}
													ref={(input) => RegisterUsername = input}/>
							<Divider />
							<TextField style={fieldsStyle}
													hintText="Parola"
													floatingLabelText="Parola"
													type="password"
													underlineShow={false}
													ref={(input) => RegisterPassword = input}/>
							<Divider />
							<TextField style={fieldsStyle}
													hintText="Spam yollamayız"
													floatingLabelText="Email adresi"
													underlineShow={false}
													ref={(input) => RegisterEmail = input}/>
							<Divider />
							<div className="flex horizontal layout center-center">
								<RaisedButton primary={true}
															style={buttonStyle}
															label="KAYIT"
															ref={(button) => RegisterButton = button}
															onClick={this.registerUser.bind(this)}/>
							</div>
						</Paper>
					}
				</div>
				<div style={{marginTop: 25}}></div>
				<LogoOne withBrand={true} withAnchor={true}/>
			</div>
		)
	}
};

export default OneSignPage;
