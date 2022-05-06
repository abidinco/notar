import React from 'react';
import Chip from 'material-ui/Chip';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ProfileChip from '../components/ProfileChip';
import IconKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

class NotarDocumentPageGeneral extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slideIndex: "genel"
		}
	}
	handleTabChange(value) {
		FlowRouter.setQueryParams({t: value})
	}
	handleChipTouchTap() {
		console.log('profile');
	}
	render() {
		return(
			<div>
				<Tabs onChange={this.handleTabChange.bind(this)}
							value={this.state.slideIndex}>
							<Tab label="Genel" value="genel" />
							<Tab label="Sorular" value="sorular" />
							<Tab label="Yorumlar" value="yorumlar" />
				</Tabs>
				{/* Genel */}
				<div className="container pt-2">
					<div className="vertical layout center-center">
						<div className="horizontal layout center grey-700">
							<img src="/universityLogos/Sakarya.png" />
							<div className="ml-1">Sakarya Üni Hukuk</div>
						</div>
						<div className="fs-1-5 grey-700 fs-1-5 mb-1 mt-1">Ticaret, Vize, 2016</div>
						<Divider style={{width: 300}} />
						<div className="horizontal layout center mb-1 mt-1">
							<ProfileChip username="seabey" />
							<div className="ml-0-5">1 saat önce oluşturdu</div>
						</div>
						<div className="mb-1">
							<FlatButton label="Mesaj gönder" />
						</div>
						<Divider style={{width: 300}} />
						<div className="mt-1 horizontal layout center pb-1">
							<IconButton touch={true}>
								<IconKeyboardArrowDown className="grey-700-imp"/>
							</IconButton>
							<div className="mr-1 ml-1 grey-700">189</div>
							<IconButton touch={true}>
								<IconKeyboardArrowUp className="grey-700-imp"/>
							</IconButton>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NotarDocumentPageGeneral;
