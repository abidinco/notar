import React from 'react';
import Paper from 'material-ui/Paper';
import Dropzone from 'react-dropzone';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Bert} from 'meteor/themeteorchef:bert';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import IconChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import ProfilePictureWithUpload from './ProfilePictureWithUpload.jsx';

class ProfileHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			files: null
		};
		const dropZone = null;
	}
	handleOnDrop(files){
		this.setState({
			files: files
		});
		let data = new FormData();
		data.append('username', Meteor.user().username);
		data.append('header', files[0]);
		fetch("http://localhost:8090/upload/header", {
			method: "POST",
			body: data,
			mode: 'no-cors',
			files: files
		});
	}
	handleOnOpenClick() {
		dropZone.open()
	}
	render() {
		return(
			<div className="vertical layout flex profile-header"
						style={{backgroundImage: 'url("http://localhost:8090/content/one/header/' + this.props.username + '")'}}>
				<div className="action-change-header-wrapper">
					<IconPhotoCamera className="action-change-header" onClick={this.handleOnOpenClick.bind(this)}/>
				</div>
				<div className="container vertical layout" style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>
					<div className="horizontal layout justified center">
						<div className="horizontal layout center">
							<ProfilePictureWithUpload username={this.props.username} />
							<div className="vertical layout justified ml-1 c-white">
								<div className="fs-1-5">{this.props.username}</div>
								<div className="fs-0-7">{this.props.karma} karma</div>
							</div>
						</div>
						<div>
							<IconButton href="/profil/ayarlar"><IconSettings className="c-white-imp"/></IconButton>
							<IconButton href={"/mesaj/" + this.props.username}><IconChatBubble className="c-white-imp"/></IconButton>
						</div>
					</div>
					<Tabs className="mt-1" inkBarStyle={{bottom: -2, marginTop: -3, height: 3}} tabItemContainerStyle={{backgroundColor: 'transparent'}}>
						<Tab href={"/profil/" + this.props.username} label="Genel" />
					</Tabs>
				</div>
				<Dropzone style={{display: 'none', width: 0, height: 0}} disablePreview ref={(zone) => dropZone = zone} onDrop={this.handleOnDrop.bind(this)}></Dropzone>
			</div>
		)
	}
}

export default ProfileHeader;
