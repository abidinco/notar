import React from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import NotarQuestion from '../components/NotarQuestion';

class NotarDocumentPageQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slideIndex: "sorular"
		}
	}
	handleDrawerToggle(){
		this.setState({isDrawerOpen: !this.state.isDrawerOpen});
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
				<div className="container mt-3 vertical layout center-center">
					<NotarQuestion test
													commentCount="13"
													questionBody="Soru metni"
													questionNumber="1"
													questionOptions={[{letter: "A", body: "A body"},
																						{letter: "B", body: "B body"},
																						{letter: "C", body: "C body"}]}/>
					<NotarQuestion commentCount="1" questionBody="Soru soru soru" questionNumber="2" />
					<NotarQuestion commentCount="12" questionBody="Soru soru soru" questionNumber="3" />
				</div>
				<Drawer docked={false}
							width={250}
							open={this.state.isDrawerOpen}
							onRequestChange={(isDrawerOpen) => this.setState({isDrawerOpen})}>
					<MenuItem leftIcon={<Avatar style={{height:30,width:30}} src="/pp.jpg" />}>
							seabey
					</MenuItem>
			</Drawer>
			</div>
		)
	}
};

export default NotarDocumentPageQuestions;
