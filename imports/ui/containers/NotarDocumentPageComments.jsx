import React from 'react';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import IconSort from 'material-ui/svg-icons/content/sort';
import {Toolbar, ToolbarGroup, ToolbarSeperator, ToolbarTitle} from 'material-ui/Toolbar';

import NotarComment from '../components/NotarComment';

class NotarDocumentPageComments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slideIndex: "yorumlar",
			commentSort: 2
		}
	}
	handleTabChange(value) {
		FlowRouter.setQueryParams({t: value})
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
				<Tabs onChange={this.handleTabChange.bind(this)}
							value={this.state.slideIndex}>
							<Tab label="Genel" value="genel" />
							<Tab label="Sorular" value="sorular" />
							<Tab label="Yorumlar" value="yorumlar" />
				</Tabs>
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
								<div className="grey-700 fs-0-8"><span className="grey-500">Doküman için</span> 13 yoru</div>
								<RaisedButton label="Yor" primary={true} />
							</ToolbarGroup>
						</div>
					</Toolbar>
					<div className="container vertical layout center-center mt-1">
						<NotarComment body="Lorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sitLorem	ipsum dolor sit" author="seabey"/>
						<NotarComment sub body="Lorem" author="serdar"/>
					</div>
				</div>
			</div>
		)
	}
}

export default NotarDocumentPageComments;
