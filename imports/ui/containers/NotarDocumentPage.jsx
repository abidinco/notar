import React from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import SwipeableViews from 'react-swipeable-views';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import IconSort from 'material-ui/svg-icons/content/sort';
import IconReply from 'material-ui/svg-icons/content/reply';
import IconMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import {Toolbar, ToolbarGroup, ToolbarSeperator, ToolbarTitle} from 'material-ui/Toolbar';

let voteIconStyle = {
	 minWidth:40,
	 width:40,
	 height:40,
	 paddingTop:8
}

class NotarDocumentPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDrawerOpen: false,
			slideIndex: 2,
			commentSort: 2
		}
	}
	handleSlideChange(value) {
		this.setState({slideIndex: value})
	}
	handleDrawerToggle(){
		this.setState({isDrawerOpen: !this.state.isDrawerOpen});
	}
	handleChipTouchTap() {
		console.log('profile');
	}
	handleCommentSort(event, index, value) {
		this.setState({commentSort: value})
	}
	render() {
		return(
			<div>
				<AppBar title="notar"
								onLeftIconButtonTouchTap={this.handleDrawerToggle.bind(this)}/>
				<Tabs onChange={this.handleSlideChange.bind(this)}
							value={this.state.slideIndex}>
							<Tab label="Genel" value={0} />
							<Tab label="Sorular" value={1} />
							<Tab label="Yorumlar" value={2} />
				</Tabs>
				<SwipeableViews index={this.state.slideIndex}
												onChangeIndex={this.handleSlideChange.bind(this)}>
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
								<a href="/profil">
									<Chip onTouchTap={this.handleChipTouchTap.bind(this)}>
										<Avatar style={{width:33,height:33}} src="/pp.jpg" />
										seabey
									</Chip>
								</a>
								<div className="ml-0-5">1 saat önce oluşturdu</div>
							</div>
							<div className="mb-1">
								<FlatButton label="Mesaj gönder" />
							</div>
							<Divider style={{width: 300}} />
							<div className="mt-1 horizontal layout center pb-1">
								{/*
								<FlatButton style={voteIconStyle}>
									<IconKeyboardArrowDown className="grey-700-imp"/>
								</FlatButton>
								*/}
								<IconButton touch={true}>
									<IconKeyboardArrowDown className="grey-700-imp"/>
								</IconButton>
								<div className="mr-1 ml-1 grey-700">189</div>
								<IconButton touch={true}>
									<IconKeyboardArrowUp className="grey-700-imp"/>
								</IconButton>
								{/*
								<FlatButton style={voteIconStyle}>
									<IconKeyboardArrowUp className="grey-700-imp"/>
								</FlatButton>
								*/}
							</div>
						</div>
					</div>
					{/* Sorular */}
					<div className="container mt-3 vertical layout center-center">
						<Paper zDepth={2} className="notar-question-box">
							<span className="question-number">1</span>
							Soru metni Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Paper>
						<div className="notar-below-question-box horizontal layout center justified">
							<FlatButton className="grey-800" label="YOR" />
							<a href="">13 yoru</a>
						</div>
						<Paper zDepth={2} className="notar-question-box vertical layout">
							<span className="question-number">2</span>
							<div className="mb-1">
							Aşağıdakilerden hangisi temel hak ve hürriyetlerin sınırlanması ile ilgili olarak, 1961 Anayasası’nda açıkça şeklinde yer almamış; ancak Anayasa Mahkemesi kararlarında yine de varlığı korunmuş ve 1982 Anayasası’nda 2001 yılında yapılan değişikliklerle tekrar açık bir Anayasa kuralı olarak düzenlenmiştir?
							</div>
							<Divider style={{height: 1}}/>
							<div className="options mt-1 vertical layout">
								<div className="horizontal layout center">
									<span>13 / 31</span>
									<div>Sınırlamanın ancak kanunla yapılabilmesi </div>
								</div>
								<div className="horizontal layout center">
									<span>2</span>
									<div>Sınırlamanın demokratik toplum düzeninin gereklerine uygun olması Sınırlamanın demokratik toplum düzeninin gereklerine uygun olması</div>
								</div>
								<div className="horizontal layout center">
									<span>1</span>
									<div>Sınırlamanın ölçülü olması</div>
								</div>
								<div className="horizontal layout center">
									<span>5</span>
									<div>Sınırlamanın öze dokunmaması</div>
								</div>
								<div className="horizontal layout center">
									<span>22</span>
									<div>Sınırlamanın laik Cumhuriyetin gereklerine aykırı olmaması</div>
								</div>
							</div>
						</Paper>
						<div className="notar-below-question-box horizontal layout center justified">
							<FlatButton className="grey-800" label="YOR" />
							<a href="">13 yoru</a>
						</div>
						<Paper zDepth={2} className="notar-question-box">
							<span className="question-number">3</span>
							Soru metni Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Paper>
						<div className="notar-below-question-box horizontal layout center justified">
							<FlatButton className="grey-800" label="YOR" />
							<a href="">13 yoru</a>
						</div>
					</div>
					{/* Yorumlar */}
					<div className="vertical layout">
						<Toolbar>
							<div className="container horizontal layout justified">
								<ToolbarGroup firstChild={true}>
									<DropDownMenu value={this.state.commentSort} onChange={this.handleCommentSort.bind(this)}>
										<MenuItem value={0} primaryText="Yeni" />
										<MenuItem value={1} primaryText="Eski" />
										<MenuItem value={2} primaryText="En iyi" />
									</DropDownMenu>
								</ToolbarGroup>
								<ToolbarGroup>
									<div className="grey-700">13 yoru</div>
									<RaisedButton label="Yor" primary={true} />
								</ToolbarGroup>
							</div>
						</Toolbar>
						<div className="container vertical layout center-center mt-1">
							{/* Comment */}
							<Paper zDepth={1} className="notar-comment-box vertical layout">
								<div className="mb-1">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<Divider style={{height: 1}}/>
								<div className="horizontal layout center justified mt-1">
									<div className="horizontal layout center">
										<Chip onTouchTap={this.handleChipTouchTap.bind(this)}>
											<Avatar style={{width:33,height:33}} src="/pp.jpg" />
											seabey
										</Chip>
										<div className="ml-0-5 grey-700">3s önce yordu</div>
									</div>
									<div className="horizontal layout center">
										<IconMenu anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      												targetOrigin={{horizontal: 'right', vertical: 'top'}}
															iconButtonElement={
																<IconButton touch={true}>
																	<IconMoreVert className="grey-700-imp"/>
																</IconButton>
															}>
											<MenuItem primaryText="Bildir" />
											<MenuItem primaryText="Lol" />
									</IconMenu>
										<IconButton touch={true}>
											<IconReply className="grey-700-imp"/>
										</IconButton>
									</div>
								</div>
							</Paper>
							{/* Subcomment */}
							<Paper zDepth={1} className="notar-comment-box sub vertical layout">
								<div className="mb-1">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
								<Divider style={{height: 1}}/>
								<div className="horizontal layout center justified mt-1">
									<div className="horizontal layout center">
										<Chip onTouchTap={this.handleChipTouchTap.bind(this)}>
											<Avatar style={{width:33,height:33}} src="/pp.jpg" />
											seabey
										</Chip>
										<div className="ml-0-5 grey-700">3s önce yordu</div>
									</div>
									<div className="horizontal layout center">
										<IconButton touch={true}>
											<IconReply className="grey-700-imp"/>
										</IconButton>
									</div>
								</div>
							</Paper>
						</div>
					</div>
				</SwipeableViews>
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

export default NotarDocumentPage;
