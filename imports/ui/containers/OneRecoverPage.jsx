import React from 'react';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import LogoOne from '../components/LogoOne.jsx';

let formStyle = {
    width: 350,
		marginTop: 40
}, fieldsStyle = {
  marginLeft: 20,
  paddingRight: 20
}, buttonStyle = {
	margin: '10px 5px'
}, RecoverEmail, RecoverButton;

class OneRecoverPage extends React.Component {
	constructor(props) {
		super(props)
	}
	recoverAccount() {
		console.log(1);
	}
	render() {
		return(
			<div className="vertical flex layout center">
				<div style={formStyle} className="vertical layout center-center">
					<div className="horizontal layout center" style={{marginBottom: 20}}>
					// TODO: This page isnt working
					</div>
					<Paper zDepth={1}>
						<TextField style={fieldsStyle}
											 hintText="Email adresi"
											 underlineShow={false}
											 ref={(input) => RecoverEmail = input}/>
					 	<Divider />
						<div className="horizontal layout flex end-justified">
						<RaisedButton primary={true}
													label="SIFIRLA UĞURCUM"
													style={buttonStyle}
													ref={(button) => RecoverButton = button}
													onClick={this.recoverAccount.bind(this)}/>
						</div>
				 	</Paper>
				</div>
				<div style={{marginTop: 25}}></div>
				<LogoOne width={75} height={50} withBrand={true} withAnchor={true}/>
			</div>
		);
	}
}

export default OneRecoverPage;
