import React from 'react';
import Dropzone from 'react-dropzone';
import {Bert} from 'meteor/themeteorchef:bert';
import IconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';

class ProfilePictureWithUpload extends React.Component {
	constructor(props) {
		super(props);
		const dropZone = null;
		this.state = {
			files: null
		}
	}
	handleOnDrop(files){
		this.setState({
			files: files
		});
		let data = new FormData();
		data.append('username', Meteor.user().username);
		data.append('avatar', files[0]);
		fetch("http://localhost:8090/upload/pp", {
			method: "POST",
			body: data,
			mode: 'no-cors',
			files: files
		});
		Bert.alert('Profil resmin başarıyla değişti', 'success', 'growl-top-right');
	}
	handleOnOpenClick() {
		dropZone.open()
	}
	render() {
		return(
			<div className="pointer pp-w-upload-wrapper relative">
				<IconPhotoCamera className="icon-photo-camera"/>
				<img src={"http://localhost:8090/content/one/pp/" + this.props.username} style={{width: 64, height: 64, borderRadius: 3}} onClick={this.handleOnOpenClick.bind(this)}/>
				<Dropzone style={{display: 'none', width: 0, height: 0}} disablePreview ref={(zone) => dropZone = zone} onDrop={this.handleOnDrop.bind(this)}></Dropzone>
			</div>
		)
	}
}

export default ProfilePictureWithUpload;
